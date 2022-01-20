/* ==================== Start:: imports =================== */ 
    import db from '../connection/connection';
    import Comment from '../models/Comment';
    import BlogSchema from '../models/Blogs';
    import Joi from 'joi';
    import { validateCommentData } from '../validation/validation'
/* ==================== End:: imports =================== */ 

/* ================== Start:: Creating Commenting ================ */ 
const newCommenting = async (req,res) => {
    const {  comment , blogId} =  req.body;
    const { error } = validateCommentData({ comment ,blogId}) ;
    if(error) return res.status(400).json({"error" : error.details[0].message }) ;
    try {   
        const blogExist = await BlogSchema.findOne({_id : blogId});
        if(!blogExist) return res.status(404).json({"error" : "Blog does not exist"});
        
        
        const dateCreated = Date.now();
        const creatorId = req.user._id ;  
        const newComment = new Comment({
            userId :  creatorId,
            blogId,
            comment,
            dateCreated,            
        });
        const SavedNewComment = await newComment.save();
        res.status(200).json({"data" : SavedNewComment });
    }
    catch(error){
        res.status(500).json({"message" : "Please try again"});
    }
}
/* =================== End:: Creating Commenting ================= */ 

/* ================== Start:: Getting Commenting ================ */ 
const gettingComment = async (req,res) => {
    if(!req.query.q || !req.query.limit) return res.status(400).json({"error" : "Bad request"}) ;
    let limitNumber = req.query.limit ;   
    let blogid = req.query.q;

    try {
        const commentData = await Comment.find({ blogId : blogid }).limit(limitNumber);
        if(commentData.length !=  0){
            res.status(200).json({"data" : commentData});
        }
        else{
            res.status(404).json({"error" : 'No comments found'});
        }
    } catch (error) {
        res.status(500).json({ "error" : error.message });
    }
}
/* =================== End:: Getting Commenting ================= */ 

/* ================== Start:: Delete Commenting ================ */ 
const deletingComment = (req,res) => {
}
/* =================== End:: Delete Commenting ================= */ 
export { newCommenting , gettingComment ,deletingComment }