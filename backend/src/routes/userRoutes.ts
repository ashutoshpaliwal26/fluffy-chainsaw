import express, { Router } from 'express';
import getUserProfileContrller from '../controller/userProfileController';
import { userAuth } from '../middleware/authenticate';

const userRoutes = express.Router();

userRoutes.route("/profile").get(userAuth, getUserProfileContrller);

export {userRoutes};