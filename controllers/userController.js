/* ==================== Start:: imports =================== */ 
import db from '../connection/connection';
import Users from '../models/Users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { fail, success , sendError } from '../functions/response';
import { updateValidation , registerValidation, loginValidation} from "../validation/validation"

dotenv.config();
/* ==================== End:: imports ==================== */ 



/* =========== Start:: Getting all users ========== */
const selectAllUsers = async (req , res) => {
  
    try {
        let limitNumber = req.query.limit != "" ||  req.query.limit != null ? req.query.limit  : 6 ;
        const users =  await Users.find({}).limit(limitNumber);
        if(users.length === 0 ) return fail(res , 404 , null ,"No users is currently registered");
        success(res,200,users,'Fetched');
        return;
        
    } catch (error) {
        message = error.message;
        sendError(res,500,null,message);
    }    
}
/* =========== end:: Getting all users ============ */

/* =========== Start:: Getting spacific users ===== */
const getSpacificUser = async (req , res) => {
    let id = req.user._id ;  ;
    if(id.trim() === '' || id.trim() === null){
        return fail(res , 400 , null ,"Bad request");
    }

    try {
        var query = { _id : id };
        const userFound = await Users.find(query);
         
        if(userFound.length == 0){
            return fail(res , 404 , null ,"User does not exist");
        }
        
        else{
            const {Username , Email , Fullname , userType , profile} =  userFound[0] ;
            success(res,200,{Username , Email , Fullname , userType , profile},'Fetched');
            return;
        }
    } catch (error) {
        message = error.message;
        sendError(res,500,null,message);
    }
}
/* =========== End:: Getting spacific users ======= */

/* =========== Start:: Creating new users ======== */
const createNewUser = async (req,res) => {
    const { Username , password , Email ,Fullname } =  req.body;
    const emailIsVerified = false ;
    const {error} = registerValidation({ Email, password, Username, Fullname } );
    if(error) return fail(res , 400 , null , error.details[0].message);

    
    try {      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
      
        /* ===== Start:: making sure email is unique ====== */
            const emailExist = await Users.findOne({Email : Email});
            if(emailExist) return fail(res , 400 , null , "Email already exist");
        /* ====== End:: making sure email is unique ======= */
        const newUser = new Users({
            Username , 
            Password : hashedPassword ,
            Email , 
            emailIsVerified ,
            Fullname,
            userType : "normal"
        });
        const savedUser = await newUser.save();
        success(res,201,{ Username ,Email , Fullname},'Registered');
        return;
    }
    catch(error){
        let message = error.message;
        sendError(res,500,null,message);
    }
}
/* =========== End:: Creating new users ========== */

/* =========== Start:: Login users ======== */
const login = async (req,res) => {
    // validation for joi
    const { Email , Password } = req.body;
    const { error } =   loginValidation({ Email , Password });
    if(error) return res.status(400).json({"error" : error.details[0].message }) ;

    try {  
        const emailExist = await Users.findOne({Email : Email});
        if(!emailExist) return  fail(res , 401 , null , "Invalid credentials");

        const passwordMatch = await bcrypt.compare(Password,emailExist.Password);
        if(!passwordMatch) return fail(res , 401 , null , "Invalid credentials");
        // setting token
        const token = jwt.sign({_id : emailExist._id},process.env.TOKEN_SECRET);
        res.header('auth-token',token).status(200).json({"status" : "success" , "data" : { token } , "message":"Logged in"});
    } catch (error) {     
        let message = error.message;
        sendError(res,500,null,message); 
    }

}
/* =========== End:: Login users ========== */

/* ============ Start:: Update Blog  ============= */
const updateUser = async (req , res) => {
    const {error} = updateValidation(req.body);
    if(error) return fail(res , 400 , null , error.details[0].message);

    try {      
        
        let id = req.user._id;
        req.body._id = id;
        if(req.body.userType) return  fail(res , 401 , null , `You can not update this key`);
        let updated = await Users.findOneAndUpdate(
            {_id : id },
            {$set: req.body} );
        if(updated){
            const updateInfo = await Users.findOne({_id : id});
            const resUsername = updateInfo.Username ;
            const resEmail = updateInfo.Email; 
            const resFullname = updateInfo.Fullname ;
            
            const updatedContent =  { Username : resUsername , Email :resEmail ,Fullname :resFullname } ;
            success(res,200,updatedContent,'Updated');
            return;         
        }        
        else{
            let message = 'Please try again, with new values';
            sendError(res,204,null,message);
        }
    }
    catch(error){
        let message = error.message;
        sendError(res,500,null,message);
    }
}
/* ============== End:: Update Blog  ============= */
export { selectAllUsers , getSpacificUser , createNewUser ,login ,updateUser }