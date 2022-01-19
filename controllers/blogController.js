import db from '../connection/connection';
import BlogSchema from '../models/Blogs';
import Joi from 'joi';


/* ============ Start:: validation ================== */
const validateBlogData = (data) =>  {
    const formSchema = Joi.object({
        Subtitle: Joi.string().required().min(2),
        Title: Joi.string().required().min(3),
        Description:Joi.string().required(),
        postBanner:Joi.string().required()
    })

    const value = formSchema.validate(data , { abortEarly: false });
    return value ;
}
const validateUpdateData = (data) =>  {
    const formSchema = Joi.object({
        Subtitle: Joi.string().min(2),
        Title: Joi.string().min(3),
        Description:Joi.string(),
        postBanner:Joi.string(),
        _id:Joi.string().required()
    })

    const value = formSchema.validate(data , { abortEarly: false });
    return value ;
}
/* ============ End:: Validation ==================== */

/* ============ Start:: Getting all Blogs but with limit ============= */
const getAllBlogs = async (req ,  res) => {
    let limitNumber = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 6 ;

    try {
        const blogsData = await BlogSchema.find({}).limit(limitNumber);
        if(blogsData.length !=  0){
            res.status(200).json(blogsData);
        }
        else{
            res.status(404).json({"message" : 'No blogs found'});
        }
    } catch (error) {
        res.status(500).json({ "message" : 'Server error' });
    }

}
/* ============== End:: Getting all Blogs but -with limit ============= */


/* ============ Start:: Getting spacific Blogs ============= */
const getSpacificBlog = async (req , res) => {
    let blogId = req.query.blogId;
    if(blogId == null || blogId == undefined || blogId.trim() == '') return res.status(400).json({"error" : "Bad request"}) ;
    try {
     
        let query = {_id : blogId};
      
        if(blogId.trim() === '' || blogId.trim() === null){
            res.status(400).json({'error' : "Bad request"});
            return;
        } 

        let data = await BlogSchema.find(query);
        if(data.length != 0){
            res.status(200).json({'message' : "Found" , "data" : data});
            return;
        }
        else{
            res.status(404).json({"error" : 'blog not found'});
            return;
        }
    } catch (error) {   
        res.status(500).json({"error" : 'Server error'});        
    }
}
/* ============== End:: Getting spacific Blogs ============= */



/* ============ Start:: Create Blog  ============= */
const createNewblog = async (req , res) => {
    const { Subtitle,Title,Description,postBanner} =  req.body;
    const { error } = validateBlogData({ Subtitle,Title,Description,postBanner }) ;
    let rate = 1;
    if(error) return res.status(400).json({"error" : error.details[0].message }) ;
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
        res.status(200).json({"data" : savedBlog });
    }
    catch(error){
        console.log(error);
        res.status(500).json({"error" : "Server error"});
    }
}
/* ============== End:: Create Blog  ============= */


/* ============ Start:: Create Blog  ============= */
const deleteBlog = async (req , res) => {
   
  
    if(!req.query.blogId) return res.status(400).json({'error' : "Bad request"}) ;

    let blogId = req.query.blogId;
    let query = {_id : blogId};
    try {      
        const blogExist = await BlogSchema.findOne({_id : blogId});
        if(!blogExist) return res.status(404).json({"error" : "Blog does not exist"});

        let data = await BlogSchema.deleteOne(query);
        if(data.deletedCount === 1 ){
            res.status(200).json({"message" : `blog with this id ${blogId} have been deleted`});
            return;
        }
        else{
            res.status(404).json({"error" : 'we don\'t have that blog'});
            return;
        }
    } catch (error) {   
        res.status(500).json({"error" : 'Server error , make sure you you id is accurate'});        
    }
}
/* ============== End:: Create Blog  ============= */

/* ============ Start:: Update Blog  ============= */
const updateBlog = async (req , res) => {
    const { error } = validateUpdateData(req.body) ;
    let rate = 1;
    if(error) return res.status(400).json({"error" : error.details[0].message }) ;

    try {
        let blogId = req.body._id;
        let bodyData =req.body;
        let data = await BlogSchema.findOneAndUpdate(
            {_id : blogId},
            { $set:bodyData });
        
        if(data){
            res.status(200).json({"message" : "Updated" , "data" : `${data}` });
            return;            
        }
        else{
            res.status(404).json({"error" : 'we don\'t have that blog'});
            return;

        }
    } catch (error) {   
        res.status(500).json({"error" : 'Server error'});        
    }
}
/* ============== End:: Update Blog  ============= */

export { getAllBlogs , getSpacificBlog ,createNewblog,deleteBlog,updateBlog }