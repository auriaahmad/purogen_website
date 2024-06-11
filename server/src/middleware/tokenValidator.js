const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    try {
        const excludedRoutes = ['/signin','/logout','/signin/customer','/signin/user','/logout/customer','/logout/user'];
        if (excludedRoutes.includes(req.path)) {
            // Skip the middleware and move to the next middleware/route handler
            return next();
        }
        const token = req.cookies.purogen_cookie;
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = verifyToken;