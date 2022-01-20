import express from 'express';
import bodyParser from 'body-parser';
import * as users from '../controllers/userController.js';
import * as authentication from '../middlewares/authenticate.js'

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



/**
 * @swagger
 * components:
 *   schemas:
 *    Users:
 *       type: object
 *       required:
 *         - "Username"
 *         - "password"
 *         - "Email"
 *         - "Fullname"
 *       properties:
 *          _id:
 *            type: string
 *            description: It is auto genereted    
 *          Username:
 *            type: string
 *            description: This is holds the one who is commenting
 *          Password:
 *            type: string
 *            description: This is holds user email
 *          Email:
 *            type: boolean
 *            description: This is blog to be commented on
 *          emailIsVerified:
 *            type: boolean
 *            description: This is holds the subject
 *          Fullname:
 *            type: string
 *            description: This is takes the date
 *          userType:
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
 *  name: Auth
 *  description: Contacting api
 * 
 * */ 


/**
 * @swagger 
 * /api/v1/user/login:
 *  post:
 *    summary: logging in user
 *    tags:
 *    - "Auth"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Email:
 *                    type: string
 *                    description: This takes email
 *                 password:
 *                    type: string
 *                    description: This holds subject  
 *    responses:
 *        200: 
 *          description: User logged in response
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    token:
 *                      type: string                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Wrong credentials
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
 * /api/v1/user/update:
 *  put:
 *    summary: Updating a user
 *    tags:
 *    - "Auth"
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
 *              required: false
 *              properties:
 *                 Username:
 *                    type: string
 *                    description: This takes email
 *                 password:
 *                    type: string
 *                    description: This holds subject  
 *                 Email:
 *                    type: string
 *                    description: This holds comment
 *                 Fullname:
 *                    type: string
 *                    description: This holds comment
 *    responses:
 *        200: 
 *          description: User updated response
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    data:
 *                      type: array
 *                      items:
 *                        properties:
 *                          Username: 
 *                            type: string
 *                          Email:
 *                            type: string
 *                          Fullname:
 *                            type: string 
 *                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Invalid Credentials
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
 * /api/v1/user/register:
 *  post:
 *    summary: Creating new user
 *    tags:
 *    - "Auth"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Username:
 *                    type: string
 *                    description: This takes email
 *                 password:
 *                    type: string
 *                    description: This holds subject  
 *                 Email:
 *                    type: string
 *                    description: This holds comment
 *                 Fullname:
 *                    type: string
 *                    description: This holds comment
 *    responses:
 *        200: 
 *          description: User created response
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: object
 *                      properties:
 *                        Username: 
 *                          type: string
 *                        Email:
 *                          type: string
 *                        Fullname:
 *                          type: string 
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
 * /api/v1/user:
 *  get:
 *    summary: Returns list of users
 *    tags:
 *    - "Auth"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: To return a spacific limits of blogs
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200: 
 *        description: This is list user
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    data:
 *                      type: array
 *                      items:
 *                         $ref: "#/components/schemas/Users"   
 *      404:
 *        description: Response with empty user list 
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
 * */ 







/* =========== Start:: Get all users ========== */

router.get('/', authentication.admin,users.selectAllUsers);

/* =========== End:: Get all users =========== */

/* ==================== Start:: Get spacific user ========================= */ 

router.get('/find',authentication.admin,users.getSpacificUser);

/* ========================= End:: Get spacific user ====================== */ 

/* ====== Start:: Creating users =========== */ 

router.post('/register',users.createNewUser );

/* ====== End:: Creating users =========== */ 

/* ====== Start:: Login users =========== */ 

router.post('/login',users.login );

/* ====== End:: Login users =========== */ 

/* ====== Start:: Update users =========== */ 

router.put('/update',authentication.auth,users.updateUser );

/* ====== End:: Update users =========== */ 

export default router;