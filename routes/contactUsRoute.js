import express from 'express';
import bodyParser from 'body-parser';
import * as authentication from '../../middlewares/middlewares-babel/authenticate.js'
import * as contact from '../../controllers/controller-babel/contactUsController';

const router =  express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* ========== Start:: Getting  All blogs ======== */ 
    router.post('/',contact.creatNewContact);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */ 
    router.get('/',authentication.admin,contact.getContact);
/* =========== End:: Getting  Spacific blog ========= */

export default router;