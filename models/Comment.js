import Mongoose  from "mongoose";

const commentSchema = Mongoose.Schema({
    userId: {
        type:String,
        required:'User id is required'
    },
    blogId: {
        type:String,
        required:'Blog id is required'
    },
    comment:{
        type:String,
        required:'Comment is required'
    },
    dateCreated:{
        type:String
    }
})

export default Mongoose.model("Comment" , commentSchema);