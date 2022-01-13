/* ==================== Start:: DB data =================== */ 
import db from '../../connection/connection-babel/connection';
import Users from '../../models/models-babel/Users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();
/* ==================== End:: DB data ==================== */ 

/* =========== Start:: Getting all users ========== */
const selectAllUsers = async (req , res) => {
  
    try {
        let limitNumber = req.query.limit;
        const users =  await Users.find({}).limit(limitNumber);
        res.json(users);  
    } catch (error) {
        console.log( error );
    }    
}
/* =========== end:: Getting all users ============ */

/* =========== Start:: Getting spacific users ===== */
const getSpacificUser = async (req , res) => {
    let username = req.query.username;
    if(username.trim() === '' || username.trim() === null){
        res.status(400).json({'message' : "Bad request"});
        return;
    }

    try {
        var query = { Username : username };
        const userFound = await Users.find(query);
        if(userFound.length == 0){
            res.status(404).json({'message' : "User does not exist"});
            return;
        }
        else{
            res.status(200).json(userFound);
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"message" : "Server error"});
    }
}
/* =========== End:: Getting spacific users ======= */

/* =========== Start:: Creating new users ======== */
const createNewUser = async (req,res) => {
  

    try {
        const { Username , password , Email , userId , emailIsVerified ,Fullname } =  req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        // validations will happen here
        // if(newUsers.trim() === '' || newUsers.trim() === null){
        //     res.status(400).json({'message' : "Please make sure you have provided user information"});
        //     return;
        // }

        const newUser = new Users({
            Username , 
            Password : hashedPassword ,
            Email , 
            userId ,
            emailIsVerified ,
            Fullname
        });
        const savedUser = await newUser.save();
     
        res.status(200).json({ savedUser} );
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message" : "Server error"});
    }
}
/* =========== End:: Creating new users ========== */

/* =========== Start:: Login users ======== */
const login = async (req,res) => {
    // validation for joi
    const { Email , Password } = req.body;

    try {
        const userDbData = await Users.findOne({Email : Email});
        const passwordMatch = await bcrypt.compare(Password,userDbData.Password);

        if(!passwordMatch) return res.status(400).json({"error":"Wrong password"});
        
        // setting token
        const token = jwt.sign({_id : userDbData._id},process.env.TOKEN_SECRET);
        res.header('auth-token',token).status(200).json({"message" : "Logged in"});
    } catch (error) {     
        console.log(error);    
    }

}
/* =========== End:: Login users ========== */
export { selectAllUsers , getSpacificUser , createNewUser ,login }