const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const authorizeRoles = require("../middleware/role.middleware");

// Public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Forgot/reset password routes
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

// Protected route (requires login)
router.get("/profile", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: {
            user: { id: req.user._id, name: req.user.name, email: req.user.email }
        }
    });
});

// Admin-only route (requires admin role)
router.get("/admin/users", auth, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
