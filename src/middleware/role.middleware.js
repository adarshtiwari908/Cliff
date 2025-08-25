const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Access denied: you do not have the required permissions"
            })
        }
        next();
    }
}

module.exports = authorizedRoles