// Middleware function to check if the user is not logged in
module.exports.notLoggedIn = (req, res, next) => {
    // Check if the user is logged in
    if (req.session && req.session.isAuth) {
        // If logged in, return a forbidden response
        return res.status(403).json({
            status: 403,
            message: "Forbidden. User is already logged in."
        });
    }
    // If not logged in, proceed to the next middleware or route handler
    next();
};

// Middleware function to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session || !req.session.isAuth) {
        // If not logged in, return an unauthorized response
        return res.status(401).json({
            status: 401,
            message: "Unauthorized. User is not logged in."
        });
    }
    // If the user is logged in, proceed to the next middleware or route handler
    next();
};



