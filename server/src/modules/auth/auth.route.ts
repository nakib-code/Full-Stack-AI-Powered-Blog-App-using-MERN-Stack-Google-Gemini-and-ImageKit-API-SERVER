import { Router } from "express";
import { authController } from "./auth.cotroller";

const router = Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)


export const userRoute = router;