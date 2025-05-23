const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No authentication token, access denied' });
        }

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ message: 'Token verification failed, authorization denied' });
        }
    } catch (err) {
        console.error('Auth middleware error:', err);
        res.status(500).json({ message: 'Server error in auth middleware' });
    }
};

module.exports = auth; 