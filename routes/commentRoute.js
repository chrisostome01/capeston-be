import express from 'express';
import bodyParser from 'body-parser';
import * as authentication from '../middlewares/authenticate.js'
import * as comment from '../controllers/commentController.js';

const router =  express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* ========== Start:: Getting  All blogs ======== */ 
    router.post('/',authentication.auth ,comment.newCommenting);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */ 
    router.get('/',comment.gettingComment);
/* =========== End:: Getting  Spacific blog ========= */

export default router;