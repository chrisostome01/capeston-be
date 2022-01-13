import jwt from 'jsonwebtoken';

const auth = async (req , res , next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({"error" : "Access denied" });

    try {
        const verified = jwt.verify(token , process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({"error":"Access denied , please try again" });
    }
} 
export default auth;