const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware to authenticate user
const auth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Authorization token missing"});
        }

        const token = authHeader.replace("Bearer ", "");
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // find user by ID 
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }

        req.user = user; // attach user to request object
        req.token = token;
        next();
    }  catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;