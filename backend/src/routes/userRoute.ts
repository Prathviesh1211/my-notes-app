import express, { Router } from "express";
import { signup ,signin} from "../controller/userController"; 

const router: Router = express.Router(); 

router.post('/signup', signup); 
router.post('/signin', signin); 

export default router;