const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');

const User = class {
    name;
    username;
    email;
    password;

    constructor({ name, username, email, password }) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    register() {
        return new Promise(async (resolve, reject) => {
            try {
                // Encrypt password
                const hashedPassword = await bcrypt.hash(this.password, parseInt(process.env.SALT));
        
                // Create user object
                const userObj = new UserModel({
                    name: this.name,
                    email: this.email,
                    username: this.username,
                    password: hashedPassword,
                });
        
                // Save user in the database
                const userDoc = await userObj.save();
                
                // Resolve with successfullly registered userDoc
                resolve(userDoc);
            } catch (error) {
                // Reject with an internal server error message
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later."
                });
            }
        })
    }

    static isExist({ email, username}){
        return new Promise(async (resolve, reject) => {
            try{
                // Finding user using email or username
                const userExist = await UserModel.findOne({
                    $or: [{ email }, { username }],
                });
                
                // Check if email already exists
                if (userExist && userExist.email === email){
                    reject({
                        status: 400,
                        message: "Email already exists. Please choose a different email.",
                    });
                }

                // Check if username already exists
                if (userExist && userExist.username === username){
                    reject({
                        status: 400,
                        message: "Username already exists. Please choose a different email.",
                    });
                }

                resolve()
            }
            catch(error){
                // Reject with an internal server error message
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later."
                });
            }
        })
    }

    static findByLoginId({ loginId }) {
        return new Promise(async (resolve, reject) => {
            try {
                const userDoc = await UserModel.findOne({
                    $or: [{ email: loginId }, { username: loginId }],
                }).select("+password"); 
        
                
                if (!userDoc) reject({
                    status: 400,
                    message: "User not found, please register first"
                });
        
                resolve(userDoc);
            } catch (error) {
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later."
                });
            }
        });
    }
};

module.exports = User;
