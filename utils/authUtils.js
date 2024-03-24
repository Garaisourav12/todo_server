const validator = require("validator");

module.exports.cleanupAndValidate = ({ name, email, username, password }) => {
    return new Promise((resolve, reject) => {
        if (!name || !email || !username || !password)
            reject("Missing credentials");

        if (typeof name !== "string") reject("Datatype of name is wrong");
        if (typeof email !== "string") reject("Datatype of email is wrong");
        if (typeof username !== "string") reject("Datatype of username is wrong");
        if (typeof password !== "string") reject("Datatype of password is wrong");

        if(!validator.isEmail(email)){
            //example@example.example, return true || false
            reject("Email format is wrong");
        }

        if (!(3 <= username.length || username.length <= 30))
            reject("username length should be 3-30");

        if (!(6 <= password.length || password.length <= 20))
            reject("password length should be 6-20");

        // If all are validate
        resolve();
    })
}