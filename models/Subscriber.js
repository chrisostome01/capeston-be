import Mongoose  from "mongoose";

const SubscriberSchema = Mongoose.Schema({
    Email: {
        type:String,
        required:'Valid email is required'
    },
    isSubscriber:{
        type:Boolean,
        required:'Comment is required'
    },
    dateCreated:{
        type:String
    }
})

export default Mongoose.model("Subscriber" , SubscriberSchema);