const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');

const { cleanupAndValidate } = require('../utils/authUtils')
const userModel = require("../models/userModel");

// Controller function to register
module.exports.register = async (req, res) => {
    // Destructure the credentials from the request body
    const { name, email, username, password } = req.body;

    try {
        // Validate credentials
        await cleanupAndValidate({ name, email, username, password });

        // Check if email already exists
        const userEmailExists = await userModel.findOne({ email });
        if (userEmailExists) {
            return res.status(400).json({
                status: 400,
                message: "Email already exists. Please choose a different email.",
            });
        }

        // Check if username already exists
        const userUsernameExists = await userModel.findOne({ username });
        if (userUsernameExists) {
            return res.status(400).json({
                status: 400,
                message: "Username already exists. Please choose a different username.",
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

        // Create user object
        const userObj = new userModel({
            name,
            email,
            username,
            password: hashedPassword,
        });

        // Save user in the database
        const userDoc = await userObj.save();
        
        // Return successful registration response
        return res.status(201).json({
            status: 201,
            message: "Registration successful. Welcome aboard!",
            data: {
                userId: userDoc._id,
                name: userDoc.name,
                email: userDoc.email,
                username: userDoc.username,
            },
        });
    } catch (error) {
        // Return an internal server error response
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error
        });
    }
}

// Controller function to login
module.exports.login = async (req, res) => {
    // Destructure the credentials from the request body
    const { loginId, password } = req.body;

    try {
        // Find user in the database by email or username
        let userDoc;
        if (validator.isEmail(loginId)) {
            userDoc = await userModel.findOne({ email: loginId });
        } else {
            userDoc = await userModel.findOne({ username: loginId });
        }

        // Check if user exists
        if (!userDoc) {
            return res.status(400).json({
                status: 400,
                message: "User not found. Please check your email or username."
            });
        }

        // Check if the password matches the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, userDoc.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "Incorrect password. Please try again."
            });
        }

        // Update session object to mark user as authenticated
        req.session.isAuth = true;
        req.session.user = {
            userId: userDoc._id,
            name: userDoc.name,
            username: userDoc.username,
            email: userDoc.email,
        };

        // Return successful login response
        return res.status(200).json({
            status: 200,
            message: "Login successful. Welcome back!",
            data: {
                userId: userDoc._id,
                name: userDoc.name,
                username: userDoc.username,
                email: userDoc.email,
            }
        });
    } catch (error) {
        // Return an internal server error response
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error
        });
    }
}

// Controller function to logout
module.exports.logout = async (req, res) => {
    // Attempt to destroy the session
    req.session.destroy((error) => {
        if (error) {
            // If an error occurs during session destruction, return unsuccessful logout response
            return res.status(500).json({
                status: 500,
                message: "Internal server error. Please try again later.",
                error: error
            });
        }
        // If session destruction is successful, return successful logout response
        return res.status(200).json({
            status: 200,
            message: "Logout successful"
        });
    });
};

// Controller function to logout from all device
module.exports.logoutAll = async (req, res) => {
    // Get the username from the user session
    const username = req.session.user.username;

    // Define the session schema
    const sessionSchema = new mongoose.Schema({ _id: String }, { strict: false });
    // Create the session model
    const sessionModel = mongoose.model("session", sessionSchema);

    try {
        // Delete all sessions associated with the username
        const deleteDocs = await sessionModel.deleteMany({ "session.user.username": username });

        // Return a success response with the deleted session documents
        return res.status(200).json({
            status: 200,
            message: "Logout successful from all devices.",
            data: deleteDocs,
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error,
        });
    }
}