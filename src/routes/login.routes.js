
import { Router } from "express";
import { loginStudent, verifyOtp } from "../controller/login.controller.js";


const router=Router();

router.route("/register").post(loginStudent);

router.route("/verify").post(verifyOtp);

export default router;
