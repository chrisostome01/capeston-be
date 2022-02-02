import jwt from 'jsonwebtoken';
import Users from '../models/Users';
import { fail, success , sendError } from '../functions/response';

const auth = async (req , res , next) => {
    const token = req.header('auth-token');
    if(!token) return fail(res,401,null,"Access denied" );

    try {
        const verified = jwt.verify(token , process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return fail(res,401,null,"Access denied" );
    }
} 

const admin = async (req , res , next) => {
    const token = req.header('auth-token');
    if(!token) return fail(res,401,null,"Access denied" );

    try {
        const verified = jwt.verify(token , process.env.TOKEN_SECRET);
        req.user = verified;
        const userId = verified._id;

        if(!userId) return fail(res,401,null,"Access denied" );

        const userData = await Users.findOne({_id : userId});
        userData.userType != null &&  userData.userType == 'admin' ? next() : fail(res,401,null,"Access denied" ); ;
     
    } catch (error) {
        fail(res,401,null,"Access denied" );
    }
}
export { auth , admin }