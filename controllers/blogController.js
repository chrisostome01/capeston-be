import db from '../connection/connection';
import BlogSchema from '../models/Blogs';
import Joi from 'joi';
import { validateUpdateData , validateBlogData  } from '../validation/validation';
import subscriber from '../models/Subscriber';
import { fail, success , sendError } from '../functions/response';


/* ============ Start:: Getting all Blogs but with limit ============= */
const getAllBlogs = async (req ,  res) => {
    let limitNumber = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 6 ;

    try {
        let message = '';
        const blogsData = await BlogSchema.find({}).limit(limitNumber);
        if(blogsData.length !=  0){
            message = 'Fetched';
            success(res,200,blogsData,message);
        }
        else{
            message = 'No blogs were found';
            fail(res,204,null,message)
        }
    } catch (error) {
        message = error.message;
        sendError(res,500,null,message);
    }

}
/* ============== End:: Getting all Blogs but -with limit ============= */


/* ============ Start:: Getting spacific Blogs ============= */
const getSpacificBlog = async (req , res) => {
    let blogId = req.query.blogId;
    if(blogId == null || blogId == undefined || blogId.trim() == '') return fail(res,400,null,"Bad request"); 
    var message = '';
    try {
     
        let query = {_id : blogId};
      
        if(blogId.trim() === '' || blogId.trim() === null){
            res.status(400).json({"status": "error" ,"data" : null ,'message' : "Bad request"});
            return;
        } 

        let data = await BlogSchema.find(query);
        if(data.length != 0){
            message = "Found";
            success(res,200,data,message);
            return;
        }
        else{
            message = "blog not found";
            fail(res,404,null,message); 
            return;
        }
    } catch (error) {   
        message = error.message;
        sendError(res,500,null,message);      
    }
}
/* ============== End:: Getting spacific Blogs ============= */



/* ============ Start:: Create Blog  ============= */
const createNewblog = async (req , res , next) => {
    const { Subtitle,Title,Description,postBanner} =  req.body;
    const { error } = validateBlogData({ Subtitle,Title,Description,postBanner }) ;
    let rate = 1;
    if(error) return fail(res , 400 , null , error.details[0].message);
    let message = '';
    try {
        
        const dateCreated = Date.now();
        const creatorId = req.user._id ;  
        const newBlog = new BlogSchema({
            Subtitle,
            Title,
            creatorId : creatorId ,
            dateCreated,
            info : Description,
            postBanner,
            rate
        });
        const savedBlog = await newBlog.save();
        req.subscribers = await subscriber.find({isSubscriber : true});
        req.NewBlog = savedBlog;
        next(); 
         
    }
    catch(error){
        message = error.message;
        sendError(res,500,null,message);
    }
}
/* ============== End:: Create Blog  ============= */


/* ============ Start:: Create Blog  ============= */
const deleteBlog = async (req , res) => {
   
  
    if(!req.params.blogId) return fail(res,400,null,"Bad request"); 

    let blogId = req.params.blogId;
    let query = {_id : blogId};
    let message = '';
    try {      
        const blogExist = await BlogSchema.findOne({_id : blogId});
        if(!blogExist) return res.status(404).json({"status":"error", "data":null, "message" : "Blog does not exist"});

        let data = await BlogSchema.deleteOne(query);
        if(data.deletedCount === 1 ){
            message = `blog with this id ${blogId} have been deleted`;
            success(res,200,blogId,message);
            return;
        }
        else{
            message = `We don't have blog with this id ${blogId}`;
            fail(res,404,null,message);
            return;
        }
    } catch (error) {   
        message = error.message;
        sendError(res,500,null,message);
    }
}
/* ============== End:: Create Blog  ============= */

/* ============ Start:: Update Blog  ============= */
const updateBlog = async (req , res) => {
    const { error } = validateUpdateData(req.body);
    let message = '';
    if(error) return fail(res , 400 , null , error.details[0].message);

    try {
        var blogId = req.params.blogId;
        let bodyData =req.body;
        let data = await BlogSchema.findOneAndUpdate(
            {_id : blogId},
            { $set:bodyData });
        const findeUpdateBlog = await BlogSchema.findOne({_id : blogId});
        if(findeUpdateBlog){
            message = `Updated`;
            success(res,200,findeUpdateBlog,message);
            return;            
        }
        else{
            message = `We don't have blog with this id ${blogId}`;
            fail(res,404,null,message);
            return;

        }
    } catch (error) {   
        message = error.message;
        sendError(res,500,null,message);
    }
}
/* ============== End:: Update Blog  ============= */

export { getAllBlogs , getSpacificBlog ,createNewblog,deleteBlog,updateBlog }