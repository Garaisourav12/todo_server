const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { cleanupAndValidate, loginDataValidator } = require("../utils/authUtils");
const User = require("../entities/User");

// Controller function to register
module.exports.register = async (req, res) => {
    // Destructure the credentials from the request body
    const { name, email, username, password } = req.body;

    // Validate credentials
    try {
        await cleanupAndValidate({ name, email, username, password });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error,
        });
    }

    try {
        // Check the email or user is already esist or not
        await User.isExist({ email, username });

        // Creat new user instance
        const user = new User({ name, email, username, password });

        // Register the new user
        const userDoc = await user.register();

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
        return res.status(error.status).json(error);
    }
};

// Controller function to login
module.exports.login = async (req, res) => {
    // Destructure the credentials from the request body
    const { loginId, password } = req.body;

    try {
        await loginDataValidator({ loginId, password });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error,
        });
    }

    try {
        // Find user in the database by email or username
        const userDoc = await User.findByLoginId({ loginId });

        // Check if the password matches the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, userDoc.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "Incorrect password. Please try with another.",
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
            data: req.session.user,
        });
    } catch (error) {
        // Return an internal server error response
        return res.status(error.status).json(error);
    }
};

// Controller function to logout
module.exports.logout = async (req, res) => {
    // Attempt to destroy the session
    req.session.destroy((error) => {
        if (error) {
            // If an error occurs during session destruction, return unsuccessful logout response
            return res.status(500).json({
                status: 500,
                message: "Internal server error. Please try again later.",
                error: error,
            });
        }
        // If session destruction is successful, return successful logout response
        return res.status(200).json({
            status: 200,
            message: "Logout successful",
        });
    });
};

// Controller function to logout from all device
module.exports.logoutAll = async (req, res) => {
    // Get the username from the user session
    const username = req.session.user.username;

    // Define the session schema
    const sessionSchema = new mongoose.Schema(
        { _id: String },
        { strict: false }
    );
    // Create the session model
    const sessionModel = mongoose.model("session", sessionSchema);

    try {
        // Delete all sessions associated with the username
        const deleteDocs = await sessionModel.deleteMany({
            "session.user.username": username,
        });

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
            message: "Internal server error. Please try again later."
        });
    }
};
