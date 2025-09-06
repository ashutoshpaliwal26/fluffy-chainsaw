import express, { Request, Response } from 'express';
import { loginController, signupController, verifyController } from '../controller/auth/authController';
import { adminAuth, userAuth } from '../middleware/authenticate';
import googleAuthController from '../controller/auth/googleAuthController';

const authRoutes = express.Router();

authRoutes.route("/signup").post(signupController);
authRoutes.route("/login").post(loginController);
authRoutes.route("/google").post(googleAuthController);
authRoutes.route("/check").get(adminAuth, (req: Request, res:Response) => {
    return res.json({
        success : true
    });
})
authRoutes.route("/check-usr").get(userAuth, (req: Request, res:Response) => {
    return res.json({
        success : true
    });
})
authRoutes.route("/verify/:userId").post(userAuth, verifyController);
export default authRoutes;