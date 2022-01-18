import jwt from 'jsonwebtoken';
import Users from '../models/Users';

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

const admin = async (req , res , next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({"error" : "Access denied" });

    try {
        const verified = jwt.verify(token , process.env.TOKEN_SECRET);
        req.user = verified;
        const userId = verified._id;

        if(!userId) return res.status(401).json({"error" :"Access denied "});

        const userData = await Users.findOne({_id : userId});
        userData.userType != null &&  userData.userType == 'admin' ? next() : res.status(401).json({"error" : "Access denied"}) ;
     
    } catch (error) {
        res.status(401).json({"error":"Access denied , please try again" });
    }
}
export { auth , admin }