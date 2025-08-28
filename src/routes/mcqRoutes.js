
import { Router } from "express";

import {getQuestions } from "../controller/mcq.controller.js";

const router=Router();

router.route("/getques").get(getQuestions);


export default router;
