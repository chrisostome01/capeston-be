/* ==================== Start:: imports =================== */ 
    import db from '../connection/connection';
    import Comment from '../models/Comment';
    import BlogSchema from '../models/Blogs';
    import { validateCommentData } from '../validation/validation'
    import { fail, success , sendError } from '../functions/response';
/* ==================== End:: imports =================== */ 

/* ================== Start:: Creating Commenting ================ */ 
const newCommenting = async (req,res) => {
    const {  comment , blogId} =  req.body;
    const { error } = validateCommentData({ comment ,blogId}) ;
    if(error) return fail(res , 400 , null , error.details[0].message);
    try {   
        const blogExist = await BlogSchema.findOne({_id : blogId});
        if(!blogExist) return fail(res , 404 , null , "Not found");
        
        
        const dateCreated = Date.now();
        const creatorId = req.user._id ;  
        const newComment = new Comment({
            userId :  creatorId,
            blogId,
            comment,
            dateCreated,            
        });
        const SavedNewComment = await newComment.save();
        success(res,201,SavedNewComment,'Created');
        return;
    }
    catch(error){
        let message = error.message;
        sendError(res,500,null,message);
    }
}
/* =================== End:: Creating Commenting ================= */ 

/* ================== Start:: Getting Commenting ================ */ 
const gettingComment = async (req,res) => {
    if(!req.query.q || !req.query.limit) return fail(res , 400 , null , 'Bad request');;
    let limitNumber = req.query.limit ;   
    let blogid = req.query.q;
    var message = "";
    try {
        const commentData = await Comment.find({ blogId : blogid }).limit(limitNumber);
        if(commentData.length !=  0){
            message = 'Fetched';
            success(res,200,commentData,message);
        }
        else{
            message = 'No comment were found';
            fail(res,204,null,message)
        }
    } catch (error) {
        message = error.message;
        sendError(res,500,null,message);
    }
}
/* =================== End:: Getting Commenting ================= */ 

/* ================== Start:: Delete Commenting ================ */ 
const deletingComment = (req,res) => {
}
/* =================== End:: Delete Commenting ================= */ 
export { newCommenting , gettingComment ,deletingComment }