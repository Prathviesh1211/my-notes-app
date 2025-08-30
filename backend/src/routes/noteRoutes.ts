import express from "express"
import { createNote, deleteNote, getNotes } from "../controller/noteController";
import {protectRoute} from "../middleware/protectRoute"

const router=express.Router();

router.get('/',protectRoute,getNotes);
router.get('/',protectRoute,createNote);
router.post('/:id',protectRoute,deleteNote);


export default router;