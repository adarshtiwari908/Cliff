const crypto = require("crypto");
const User = require("../models/user.model");
const sendEMail = require("../config/email");

// register a new user
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // create new user
        const user = new User({ name, email, password });
        await user.save();

        // Generate auth token
        const token = await user.generateAuthToken();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// login a user
exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                token
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// logout a user
exports.logout = async (req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter(token => token.token !== req.token);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create password reset token
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });

        // You will replace this with Nodemailer later
        const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;
        const message = `Forgot your password? Click here to reset it: ${resetURL}`;
        await sendEMail({
            email: user.email,
            subject: "Password Reset Request",
            message: message
        })
        
        res.status(200).json({
            success: true,
            message: "Password reset token generated",
            resetURL // send via email in production
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// reset password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Hash token to compare with DB
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find user by token and check expiry
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Update password
        user.password = password; // pre-save hook will hash it
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password has been reset successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

