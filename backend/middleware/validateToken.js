const jwt = require('jsonwebtoken');
const secretKey = require('../secrets/token');

const verifyToken = (req,res,next)=>{
    const token = req.header('authorization');
    if(!token){
        return res.status(401).json({
            err: "Access Denied, Token not provided",
        });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying token', error);
        res.status(401).json({
            err:"Invalid token",
        });
    }
};

module.exports = verifyToken;