const jwt = require('jsonwebtoken');
const jwtKey = "acl_internship";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded;
        // for each user need to add
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};