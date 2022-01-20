/* ==================== Start:: imports =================== */ 
import db from '../connection/connection';
import Users from '../models/Users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { updateValidation , registerValidation } from "../validation/validation"

dotenv.config();
/* ==================== End:: imports ==================== */ 



/* =========== Start:: Getting all users ========== */
const selectAllUsers = async (req , res) => {
  
    try {
        let limitNumber = req.query.limit;
        const users =  await Users.find({}).limit(limitNumber);
        res.status(200).json({"data" : users});  
    } catch (error) {
        res.status(500).json({"error" : error.message})
    }    
}
/* =========== end:: Getting all users ============ */

/* =========== Start:: Getting spacific users ===== */
const getSpacificUser = async (req , res) => {
    let username = req.query.username;
    if(username.trim() === '' || username.trim() === null){
        res.status(400).json({'error' : "Bad request"});
        return;
    }

    try {
        var query = { Username : username };
        const userFound = await Users.find(query);
        if(userFound.length == 0){
            res.status(404).json({'error' : "User does not exist"});
            return;
        }
        else{
            res.status(200).json({"message" : "found" ,'data' : userFound});
            return;
        }
    } catch (error) {
        res.status(500).json({"error" : error.message });
    }
}
/* =========== End:: Getting spacific users ======= */

/* =========== Start:: Creating new users ======== */
const createNewUser = async (req,res) => {
    const { Username , password , Email ,Fullname } =  req.body;
    const emailIsVerified = false ;
    const {error} = registerValidation({ Email, password, Username, Fullname } );
    if(error) return res.status(400).json({"error" : error.details[0].message});

    
    try {      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
      
        /* ===== Start:: making sure email is unique ====== */
            const emailExist = await Users.findOne({Email : Email});
            if(emailExist) return res.status(400).json({"error" : "Email already exist " });
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
     
        res.status(200).json({ "data" : { Username ,Email , Fullname} } );
    }
    catch(error){
        res.status(500).json({"error" : error.message});
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
        if(!emailExist) return res.status(400).json({"error":"Invalid credentials"});

        const passwordMatch = await bcrypt.compare(Password,emailExist.Password);
        if(!passwordMatch) return res.status(401).json({"error":"Invalid credentials"});
        // setting token
        const token = jwt.sign({_id : emailExist._id},process.env.TOKEN_SECRET);
        res.header('auth-token',token).status(200).json({"message" : "Logged in" , "token" : token });
    } catch (error) {     
        res.status(500).json({"error": error.message});    
    }

}
/* =========== End:: Login users ========== */

/* ============ Start:: Update Blog  ============= */
const updateUser = async (req , res) => {
    const {error} = updateValidation(req.body);
    if(error) return res.status(400).json({"error" : error.details[0].message});

    try {      
        
        let id = req.user._id;
        req.body._id = id;
        let updated = await Users.findOneAndUpdate(
            {_id : id },
            {$set: req.body} );
        if(updated){
            const updateInfo = await Users.findOne({_id : id});
            const resUsername = updateInfo.Username ;
            const resEmail = updateInfo.Email; 
            const resFullname = updateInfo.Username 
            res.status(200).json({"message" : "Updated" , "data" : { Username : resUsername , Email :resEmail ,Fullname :resFullname } });
            return;         
        }        
        else{
            res.status(500).json({"error" : 'Please try again'});
            return;

        }
    }
    catch(error){
        res.status(500).json({"error" : error.message});
    }
}
/* ============== End:: Update Blog  ============= */
export { selectAllUsers , getSpacificUser , createNewUser ,login ,updateUser }