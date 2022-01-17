import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:'Comment id is required'
    },
    email:{
        type: String,
        required:'Email is requiered'
    },
    isNewContact:{
        type:Boolean,
        required:'New status required'
    },
    subject:{
        type:String,
        required:'subject is required'
    },
    dateCreated:{
        type:String,
    }
});

export default mongoose.model('Contact',contactSchema);