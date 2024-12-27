import { Router } from "express";
import {
    Login, Register
} from '../controllers/userController.js'

const router = Router();

// user 


router.post("/register", Register);

router.post("/login", Login);

export default router;