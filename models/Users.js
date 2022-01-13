import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: 'This field is required'
    },
    Fullname:{
        type: String,
        required: 'This field is required'
    },
    Username:{
        type: String,
        required: 'This field is required'
    },
    emailIsVerified:{
        type: Boolean,
        required: 'This field is required'
    },
    Password:{
        type: String,
        required: 'This field is required'
    },
    userId:{
        type: Number,
    },
    latitude:{
        type: Number,
    },
    longitude:{
        type: Number,
    },
    parentId:{
        type: Number,
    },
    profile:{
        type: String,
    },
    parentId:{
        type: Number,
    },
    userType:{
        type: String
    }
});

export default mongoose.model('Users',usersSchema);