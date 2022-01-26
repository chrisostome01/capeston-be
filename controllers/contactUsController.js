/* ==================== Start:: imports =================== */
import db from '../connection/connection';
import contactUs from '../models/ContactUs.js';
import { contactValidation } from "../validation/validation.js"

/* ==================== End:: imports =================== */ 


/* ===== Start:: Inserting new contact ===== */ 
const creatNewContact = async (req,res) => {
    const { error } = contactValidation(req.body);
    /* ===== Start:: validation ====== */
      if(error) return res.status(400).json({"error" : error.details[0].message});
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
        return res.status(200).json({"data" : savedContact});
    } catch (error) {
        return res.status(500).json({"error" :  error.message})
    }
   
}
/* ===== End:: Inserting new contact ===== */ 

/* ===== Start:: Getting contacts ===== */ 
const getContact = async (req,res) => {
    const limit = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 3 ;

    try {
        const contactData = await contactUs.find({}).limit(limit);
        if(!contactData) return res.status(200).json({"data" : null});
        return res.status(200).json({"data" : contactData})                 
    } catch (error) {
        res.status(500).json({"error" : error.message});
    }
}
/* ===== End:: Getting contacts ===== */ 
export  { creatNewContact , getContact };