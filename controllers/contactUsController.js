/* ==================== Start:: imports =================== */ 
import db from '../connection/connection';
import contactUs from '../models/ContactUs.js';
import { contactValidation } from "../validation/validation.js"
import { fail, success , sendError } from '../functions/response';
/* ==================== End:: imports =================== */ 


/* ===== Start:: Inserting new contact ===== */ 
const creatNewContact = async (req,res) => {
    const { error } = contactValidation(req.body);
    /* ===== Start:: validation ====== */
      if(error) return fail(res , 400 , null , error.details[0].message);
    /* ===== End:: validation ====== */

    try {
        const { comment, email , subject } =  req.body ;
        const isNewContact = true;
        const newContact =  new contactUs({
            comment,
            email,
            subject,
            isNewContact
        });

        const savedContact = await newContact.save();
        success(res,201,savedContact,'Created');
        return;
    } catch (error) {
        let message = error.message;
        sendError(res,500,null,message);
    }
   
}
/* ===== End:: Inserting new contact ===== */ 

/* ===== Start:: Getting contacts ===== */ 
const getContact = async (req,res) => {
    const limit = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 3 ;

    try {
        const contactData = await contactUs.find({}).limit(limit);
        if(!contactData) return fail(res,204,null,"No contacts found");
        return success(res,200,contactData,'Fetched');  
    } catch (error) {
        let message = error.message;
        sendError(res,500,null,message);
    }
}
/* ===== End:: Getting contacts ===== */ 
export  { creatNewContact , getContact };