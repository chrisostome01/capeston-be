/* ==================== Start:: imports =================== */ 
import db from '../connection/connection';
import Subscriber from '../models/Subscriber';
import { SubscriberValidation } from "../validation/validation.js";
import { fail, success , sendError } from '../functions/response';
/* ==================== End:: imports =================== */ 



const addSubscriber = async (req , res) =>{
    const { Email } =  req.body;
    const isSubscriber = true ;
    const {error} = SubscriberValidation({ Email} );
    if(error) return fail(res,400,null, error.details[0].message);  

    var message = '';
    try {      
      
        /* ===== Start:: making sure email is unique ====== */
            const emailExist = await Subscriber.findOne({Email : Email});
            if(emailExist) return  fail(res,400,null,"You have already subscribed here"); 
        /* ====== End:: making sure email is unique ======= */
        const newSubscriber = new Subscriber({           
            Email,
            isSubscriber
        });
        const SaveNewSubscriber = await newSubscriber.save();
     
        message = "You have been subscribed";
        success(res,200,SaveNewSubscriber,message);
    }
    catch(error){
        message = error.message;
        sendError(res,500,null,message);
    }
}


const getSubscribers = async (req , res) =>{
    let limitNumber = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 6 ;
    var message = '';
    try {
        const subscribers = await Subscriber.find({}).limit(limitNumber);
        if(subscribers.length !=  0){
            message = 'Fetched';
            success(res,200,subscribers,message);
        }
        else{
            message = 'No comments were found';
            fail(res,204,null,message);
        }
    } catch (error) {
        message = error.message;
        sendError(res,500,null,message);
    }

}

const removeSubscribers = async (req , res) =>{

}

export {addSubscriber , getSubscribers , removeSubscribers}