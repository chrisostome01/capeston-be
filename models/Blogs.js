import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    Subtitle:{
        type: String,
        required:'Subtile is requiered'
    },
    Title:{
        type:String,
        required:'Title is required'
    },
    dateCreated:{
        type:String,
        required:'Date is required'
    },
    info:{
        type:String,
        required:'In information are required' 
    },
    postBanner:{
        type:String,
        required:'Post image is require'
    },
    creatorId:{
        type:String,
        required:'Post image is require'        
    }
});

export default mongoose.model('Blogs',blogSchema);