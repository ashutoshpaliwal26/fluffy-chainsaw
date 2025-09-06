import expressAsyncHandler from "express-async-handler"
import { Request, Response } from 'express'
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library'
import User from "../../models/User";
import { setToken } from "../../utils/jwtService";

dotenv.config();


const clientId = process.env.GOOGLE_AUTH_CLIENT_ID as string;

const authClient = new OAuth2Client(clientId)

const googleAuthController = expressAsyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
        const ticket = await authClient.verifyIdToken({
            idToken: token.credential,
            audience: token.clientId
        })

        const payload = ticket.getPayload();
        console.log({ payload });


        if (
            !payload ||
            typeof payload.name !== "string" ||
            typeof payload.email !== "string" ||
            typeof payload.picture !== "string"
        ) {
            res.status(400).json({
                message: "Invalid payload from Google",
                success: false,
            });
            return;
        }

        const checkForUser = await User.findOne({
            email: payload.email
        }).select("+password");

        if (checkForUser) {
            // 2. Check if user exists and if the password matches
            // The `comparePassword` method is a custom instance method on our User model
            if (checkForUser && (await checkForUser.comparePassword(`${payload.email}-${payload.name}`))) {
                const token = setToken({
                    _id: checkForUser._id,
                    email: checkForUser.email,
                    role: checkForUser.role,
                    isVerified: checkForUser.isVerified
                })
                res.status(200).json({
                    user: {
                        _id: checkForUser._id,
                        name: checkForUser.name,
                        email: checkForUser.email
                    },
                    token: token,
                    message: 'User logged in successfully',
                    // Note: In a real app, you would generate and send a JWT here
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                }); // 401 Unauthorized
                throw new Error('Invalid email or password');
            }
        };

        const createUser = await User.create({
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            password: `${payload.email}-${payload.name}`,
            role: "user"
        })

        if (!createUser) {
            throw new Error("Unable to Create User");
        }

        const jwt_token = setToken({
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            role: createUser.role
        });

        if (!token) {
            throw new Error("Token Not Created");
        }

        res.status(200).json({
            message: "Google login success",
            user: {
                name: createUser.name,
                email: createUser.email,
                picture: createUser.picture,
            },
            token: jwt_token
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid Google token" });
    }
})

export default googleAuthController