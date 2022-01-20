import express from 'express';
import bodyParser from 'body-parser';
import * as authentication from '../middlewares/authenticate.js'
import * as comment from '../controllers/commentController.js';

const router =  express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *   schemas:
 *    Comment:
 *       type: object
 *       required:
 *         - "userId"
 *         - "blogId"
 *         - "comment"
 *       properties:
 *          _id:
 *            type: string
 *            description: It is auto genereted    
 *          userId:
 *            type: string
 *            description: This is holds the one who is commenting
 *          blogId:
 *            type: string
 *            description: This is blog to be commented on
 *          comment:
 *            type: string
 *            description: This is the comment
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * */ 

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Commenting api
 * 
 * */ 


/**
 * @swagger
 * /api/v1/comment:
 *  get:
 *    Comment: Returns list comments on spacific blog
 *    tags:
 *    - "Comment"
 *    parameters:
 *      - name: limit
 *        in: query
 *        description: To return a spacific limits of blogs
 *        required: false
 *        schema:
 *          type: integer
 *      - name: q
 *        in: query
 *        description: Blog id to retrive comment for
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200: 
 *        description: This is list comment on blogs selected
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    data:
 *                      type: array
 *                      items:
 *                         $ref: "#/components/schemas/Comment"   
 *      404:
 *        description: No comment found
 *        content:
 *          application/json:
 *              schema:
 *                $ref: "#/components/schemas/error"  
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *              schema:
 *                $ref: "#/components/schemas/error"  
 *           
 * /api/v1/comment/create:
 *  post:
 *    summary: Creating comment
 *    tags:
 *    - "Comment"
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
 *                 blogId:
 *                    type: string
 *                    description: This hold  the blog id to be commented on 
 *                 Comment:
 *                    type: string
 *                    description: User comment  
 *    responses:
 *        200: 
 *          description: Comment created response
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Comment"
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
 * */ 



/* ========== Start:: Getting  All blogs ======== */ 
    router.post('/create',authentication.auth ,comment.newCommenting);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */ 
    router.get('/',comment.gettingComment);
/* =========== End:: Getting  Spacific blog ========= */

export default router;