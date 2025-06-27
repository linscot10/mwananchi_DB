const jwt = require('jsonwebtoken')
const User = require('../model/User.model')

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')

            next();
        } catch (error) {
            console.error(error)
            res.status(401).json({
                message: "Not Authorized ,Token failed"
            })
            // throw new Error("Not Authorized ,Token failed");

        }

        if (!token) {
            console.error(error)
            res.status(401).json({
                message: "Not Authorized ,No Token "
            })
            // throw new Error("Not Authorized ,No Token");
        }
    }


}

module.exports = { protect }