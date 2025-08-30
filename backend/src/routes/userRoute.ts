import express, { Router } from "express";
import { signin, signup , verifyOtp} from "../controller/userController"; 

const router: Router = express.Router(); 

router.post('/signup', signup); 
router.post('/verify-otp',verifyOtp); 
router.post('/signin', signin);

export default router;