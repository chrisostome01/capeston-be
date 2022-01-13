import express from 'express';
import bodyParser from 'body-parser';
import auth from '../../middlewares/middlewares-babel/authenticate.js'
import * as blog from '../../controllers/controller-babel/blogController.js';

const router =  express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* ========== Start:: Getting  All blogs ======== */ 
    router.get('/',auth,blog.getAllBlogs);
/* =========== End:: Getting  All blogs ========= */

/* ========== Start:: Getting  Spacific blog ======== */ 
    router.get('/:blogId',blog.getSpacificBlog);
/* =========== End:: Getting  Spacific blog ========= */

/* ========== Start:: Create blog ======== */ 
    router.post('/create',blog.createNewblog);
/* =========== End:: Create blog ========= */

/* ========== Start:: Delete blog ======== */ 
    router.delete('/delete',blog.deleteBlog);
/* =========== End:: Delete blog ========= */

/* ========== Start:: Create blog ======== */ 
    router.put('/update',blog.updateBlog);
/* =========== End:: Create blog ========= */
export default router;