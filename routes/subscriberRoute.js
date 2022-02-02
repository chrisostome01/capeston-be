import express from 'express';
import bodyParser from 'body-parser';
import * as authentication from '../middlewares/authenticate.js'
import * as Subscribe from '../controllers/subscriberController';

const router =  express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *   schemas:
 *    Subscriber:
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
 *  name: Subscriber
 *  description: News letter subscriber
 * 
 * */ 


/**
 * @swagger
 * /api/v1/subscribers:
 *  get:
 *    summary: Returns list subscriber
 *    tags:
 *    - "Subscriber"
 *    parameters:
 *      - name: limit
 *        in: query
 *        description: To return a spacific limits of subscriber
 *        required: false
 *        schema:
 *          type: integer
 *      - name: auth-token
 *        in: header
 *        description: You need be authorised to have this token
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200: 
 *        description: This is list Subscribers
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    data:
 *                      type: array
 *                      items:
 *                         $ref: "#/components/schemas/Subscriber"   
 *      404:
 *        description: No subscribers found
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
 * /api/v1/subscribers/add:
 *  post:
 *    summary: Adding new subscriber
 *    tags:
 *    - "Subscriber"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Email:
 *                    type: string
 *                    description: This hold email which subscribing
 *    responses:
 *        200: 
 *          description: Subscribed response
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Subscriber"
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



/* ========== Start:: Add  subscriber ======== */ 
    router.post('/add',Subscribe.addSubscriber);
/* =========== End:: Add  subscriber ========= */

/* ========== Start:: Get  subscriber ======== */ 
    router.get('/',authentication.admin,Subscribe.getSubscribers);
/* =========== End:: Get  subscriber ========= */

export default router;