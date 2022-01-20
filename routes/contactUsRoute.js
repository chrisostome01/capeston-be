import express from 'express';
import bodyParser from 'body-parser';
import * as authentication from '../middlewares/authenticate.js'
import * as contact from '../controllers/contactUsController';

const router =  express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/**
 * @swagger
 * components:
 *   schemas:
 *    Contact:
 *       type: object
 *       required:
 *         - "comment"
 *         - "email"
 *         - "subject"
 *       properties:
 *          _id:
 *            type: string
 *            description: It is auto genereted    
 *          comment:
 *            type: string
 *            description: This is holds the one who is commenting
 *          email:
 *            type: string
 *            description: This is holds user email
 *          isNewContact:
 *            type: boolean
 *            description: This is blog to be commented on
 *          subject:
 *            type: string
 *            description: This is holds the subject
 *          dateCreated:
 *            type: string
 *            description: This is takes the date
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * */ 

/**
 * @swagger
 * tags:
 *  name: Contact
 *  description: Commenting api
 * 
 * */ 


/**
 * @swagger
 * /api/v1/contact:
 *  get:
 *    summary: Returns list of queries
 *    tags:
 *    - "Contact"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: To return a spacific limits of blogs
 *        required: false
 *        schema:
 *          type: integer
 *      - name: limit
 *        in: query
 *        description: Blog id to retrive comment for
 *        required: false
 *        schema: 
 *          type: string
 *    responses:
 *      200: 
 *        description: This is list users who Contacted and there messages
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    data:
 *                      type: array
 *                      items:
 *                         $ref: "#/components/schemas/Contact"   
 *      404:
 *        description: No contacts found
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
 * /api/v1/contact/send:
 *  post:
 *    summary: Creating comment
 *    tags:
 *    - "Contact"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 email:
 *                    type: string
 *                    description: This takes email
 *                 subject:
 *                    type: string
 *                    description: This holds subject  
 *                 comment:
 *                    type: string
 *                    description: This holds comment
 *    responses:
 *        200: 
 *          description: Queries got sent
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Contact"
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
    router.post('/send',contact.creatNewContact);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */ 
    router.get('/',authentication.admin,contact.getContact);
/* =========== End:: Getting  Spacific blog ========= */

export default router;