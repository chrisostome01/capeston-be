/* ==================== Start:: imports =================== */ 
import db from '../connection/connection';
import Subscriber from '../models/Subscriber';
import { SubscriberValidation } from "../validation/validation.js"
/* ==================== End:: imports =================== */ 



const addSubscriber = async (req , res) =>{
    const { Email } =  req.body;
    const isSubscriber = true ;
    const {error} = SubscriberValidation({ Email} );
    if(error) return res.status(400).json({"error" : error.details[0].message});

    
    try {      
      
        /* ===== Start:: making sure email is unique ====== */
            const emailExist = await Subscriber.findOne({Email : Email});
            if(emailExist) return res.status(400).json({"error" : "You have already subscribed here" });
        /* ====== End:: making sure email is unique ======= */
        const newSubscriber = new Subscriber({           
            Email,
            isSubscriber
        });
        const SaveNewSubscriber = await newSubscriber.save();
     
        res.status(200).json({ "message":"You have been subscribed","data" : SaveNewSubscriber } );
    }
    catch(error){
        res.status(500).json({"error" : error.message});
    }
}


const getSubscribers = async (req , res) =>{
    let limitNumber = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 6 ;

    try {
        const subscribers = await Subscriber.find({}).limit(limitNumber);
        if(subscribers.length !=  0){
            res.status(200).json(subscribers);
        }
        else{
            res.status(404).json({"message" : 'No blogs found'});
        }
    } catch (error) {
        res.status(500).json({ "message" : 'Server error' });
    }

}

const removeSubscribers = async (req , res) =>{

}

export {addSubscriber , getSubscribers , removeSubscribers}