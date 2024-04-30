import express from "express";
import { registerController, loginController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMidleware.js";

// router object
const router = express.Router()

//routing
//Register || METHOD POST
router.post('/register', registerController)

//test route
router.get('/test', requireSignIn, isAdmin, testController)

//LOGIN || POST
router.post('/login', loginController)

export default router