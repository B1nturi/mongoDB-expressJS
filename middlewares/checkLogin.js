const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            throw new Error('You are not authenticated');
        }
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username, userId } = decoded;
        req.username = username;
        req.userId = userId;
        next();
    } catch (err) {
        next("You are not authenticated");
    }
};


// Export the middleware
module.exports = checkLogin;