import express from 'express';
import bodyParser from 'body-parser';
import * as authentication from '../middlewares/authenticate.js'
import * as blog from '../controllers/blogController.js';
import sendEmail from '../functions/sendEmail.js';

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
 *         - "Subtitle"
 *         - "Info"
 *         - "postBanner"
 *       properties:
 *          _id:
 *            type: string
 *            description: It is auto genereted    
 *          Title:
 *            type: string
 *            description: This is title for the blog
 *          Subtitle:
 *            type: string
 *            description: Subtitle for this blog
 *          Info:
 *            type: string
 *            description: This will a description
 *          postBanner:
 *            type: string  
 *            description: Url image
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
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
 *    summary: Returns list blogs default  returns 6 , add limit in query to modify it
 *    tags:
 *    - "Blogs"
 *    parameters:
 *      - name: limit
 *        in: query
 *        description: To return a spacific limits of blogs
 *        required: false
 *        schema:
 *          type: integer
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
 *    tags:
 *    - "Blogs"
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
 *                    type: string
 *                    description: This holgs the blog 
 *                 Subtitle:
 *                    type: string
 *                    description: Subtitle  
 *                 postBanner:
 *                    type: string
 *                    description: Image       
 *    responses:
 *        200: 
 *          description: Blog created
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                 - "data"
 *                 properties:
 *                   data:
 *                     type: object
 *                     required:
 *                     - "_id"
 *                     - "Title"
 *                     - "Subtitle"
 *                     - "Info"
 *                     - "postBanner"
 *                     properties:
 *                      _id: 
 *                         type: string
 *                      Title: 
 *                         type: string
 *                      Info: 
 *                         type: string
 *                      Subtitle: 
 *                         type: string
 *                      postBanner: 
 *                         type: string
 *                     
 *                             
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 * /api/v1/blog/update:
 *  put:
 *    summary: Updating blog
 *    tags:
 *    - "Blogs"
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
 *                    type: string
 *                    description: This holds the blog 
 *                 Subtitle:
 *                    type: string
 *                    description: Subtitle  
 *                 postBanner:
 *                    type: string
 *                    description: Image       
 *    responses:
 *        200: 
 *          description: Blog have been deleted
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                 - "data"
 *                 - "message"
 *                 properties:
 *                   data:
 *                     type: object
 *                     required:
 *                     - "_id"
 *                     properties:
 *                      _id: 
 *                         type: string
 *                      Title: 
 *                         type: string
 *                      Info: 
 *                         type: string
 *                      Subtitle: 
 *                         type: string
 *                      postBanner: 
 *                         type: string
 *                   message:
 *                     type: string             
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"  
 * /api/v1/blog/delete:
 *  delete:
 *    summary: Deleting spacific  blog
 *    tags:
 *    - "Blogs"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: Authorization required
 *        required: true
 *        schema:
 *          type: string
 *      - name: blogId
 *        in: query
 *        description: blogid to delete 
 *        required: true
 *        schema:
 *          type: string  
 *    responses:
 *        200: 
 *          description: Blog deleted
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                 - "message"
 *                 properties:
 *                   message:
 *                     type: string
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"   
 * /api/v1/blog/find:
 *  get:
 *    summary: Get spacific blog
 *    tags:
 *    - "Blogs"
 *    parameters:
 *      - name: blogId
 *        in: query
 *        description: blogid to find 
 *        required: true
 *        schema:
 *          type: string  
 *    responses:
 *        200: 
 *          description: Retrieved
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message: 
 *                    type: string
 *                  data:
 *                    type: array
 *                    items:
 *                      properties:
 *                        schema:
 *                            $ref: "#/components/schemas/Blogs"
 *        400:
 *          description: Bad request
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        404:
 *          description: Not found
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"     
 * */ 



/* ========== Start:: Getting  All blogs ======== */ 
    router.get('/',blog.getAllBlogs);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */ 
    router.get('/find',blog.getSpacificBlog);
/* =========== End:: Getting  Spacific blog ========= */

/* ========== Start:: Create blog ======== */ 
    router.post('/create',authentication.admin,blog.createNewblog,sendEmail);
/* =========== End:: Create blog ========= */

/* ========== Start:: Delete blog ======== */ 
    router.delete('/delete',authentication.admin,blog.deleteBlog);
/* =========== End:: Delete blog ========= */

/* ========== Start:: Create blog ======== */ 
    router.put('/update',authentication.admin,blog.updateBlog);
/* =========== End:: Create blog ========= */
export default router;