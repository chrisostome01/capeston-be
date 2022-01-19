import express from 'express';
import bodyParser from 'body-parser';
import * as authentication from '../middlewares/authenticate.js'
import * as blog from '../controllers/blogController.js';

const router =  express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *   schemas:
 *    Blogs:
 *       type: object
 *       required:
 *         - "Title"
 *         - "Subtile"
 *         - "Info"
 *         - "postBanner"
 *         - "Subtitle"
 *       properties:
 *          _id:
 *            type: string
 *            description: It is auto genereted    
 *          Title:
 *            type: string
 *          Info:
 *            type: string
 *          postBanner:
 *            type: string  
 *            description: Url image
 *          Subtitle:
 *            type: string
 *            description: Subtitle
 * 
 * */ 

/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: Blogs api
 * 
 * */ 


/**
 * @swagger
 * /api/v1/blog:
 *  get:
 *    summary: Returns all blogs
 *    responses:
 *      200: 
 *        description: This is list of blogs we got
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Blogs"   
 * /api/v1/blog/create:
 *  post:
 *    summary: Creating new blog
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: Authorization reqiured
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Title:
 *                    type: string
 *                    description: This hold title
 *                 Description:
 *                    type: sting
 *                    description: This holgs the blog 
 *                 Subtitle:
 *                    type: string
 *                    description: Subtitle      
 *    responses:
 *        200: 
 *          description: Blog create successfull
 *          content:
 *             application/json:
 *                schema:
 *                  properties:
 *                      data: 
 *                         type: string
 *                         desciption: This will be abject contaoning reposponse
 *                      properties:
 *                          schema:            
 *                             $ref: "#/components/schemas/Blogs"   
 *                             
 * 
 * */ 
/* ========== Start:: Getting  All blogs ======== */ 
    router.get('/',blog.getAllBlogs);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  All blogs ======== */ 
    router.get('/limited',blog.getAllBlogs);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */ 
    router.get('/find',blog.getSpacificBlog);
/* =========== End:: Getting  Spacific blog ========= */

/* ========== Start:: Create blog ======== */ 
    router.post('/create',authentication.admin,blog.createNewblog);
/* =========== End:: Create blog ========= */

/* ========== Start:: Delete blog ======== */ 
    router.delete('/delete',authentication.admin,blog.deleteBlog);
/* =========== End:: Delete blog ========= */

/* ========== Start:: Create blog ======== */ 
    router.put('/update',authentication.admin,blog.updateBlog);
/* =========== End:: Create blog ========= */
export default router;