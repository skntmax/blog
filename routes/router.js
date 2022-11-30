import  express  from "express";
const router = express.Router();
import {signupUser, loginUser} from '../controllers/user_controller.js'


router.post('/signup', signupUser)
router.post('/login',  loginUser )
 
export default router;