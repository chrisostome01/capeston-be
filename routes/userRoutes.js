import express from 'express';
import bodyParser from 'body-parser';
import * as users from '../controllers/userController.js';
import * as authentication from '../middlewares/authenticate.js'

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* =========== Start:: Get all users ========== */

router.get('/', users.selectAllUsers);

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