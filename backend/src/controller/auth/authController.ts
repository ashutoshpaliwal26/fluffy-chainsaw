import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../../models/User';
import otpGenerator from 'otp-generator'
import { setToken } from '../../utils/jwtService';
import expressAsyncHandler from 'express-async-handler';
import { sendMail } from '../../utils/mailService';

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const signupController = asyncHandler(
    // The types for the request body are inferred from our Zod schema
    async (req: Request, res: Response) => {
        const { email, name, password, role } = req.body;

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(409).json({
                success: false,
                message: "User with that email already exists"
            }); // 409 Conflict
            throw new Error('User with that email already exists');
        }

        // 2. Create new user
        // The pre-save middleware in the User model will automatically hash the password
        const user = await User.create({
            name,
            email,
            password,
            role,
            otp: otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false }),
            isVerified: false
        });

        // 3. Respond with user data (excluding password)
        if (user) {
            await sendMail(user.email, `The Verification Code is : ${user.otp}`)
            const token = setToken({
                _id: user._id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            })
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: token,
                message: 'User registered successfully',
                // Note: In a real app, you would generate and send a JWT here
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid user data"
            });
            throw new Error('Invalid user data');
        }
    }
);

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginController = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // 1. Find the user by email
        // We must explicitly select the password because it's excluded by default in the schema
        const user = await User.findOne({ email }).select('+password');

        // 2. Check if user exists and if the password matches
        // The `comparePassword` method is a custom instance method on our User model
        if (user && (await user.comparePassword(password))) {
            const token = setToken({
                _id: user._id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            })
            res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
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
    }
);

export const verifyController = expressAsyncHandler(async (req: Request, res: Response) => {
    const { otp } = req.body;
    const { userId } = req.params;
    const usr = req.user;

    if (!otp) {
        res.status(400).json({
            message: "Otp Not found",
            success: false
        })
    }

    if (!usr) {
        res.status(400).json({
            message: "User Not Found",
            success: false
        })
    }

    const userOtp = parseInt(usr?.otp as string);
    console.log({ usr });

    if (userOtp !== parseInt(otp)) {
        res.status(400).json({
            message : "Wrong OTP",
            success: true
        })
    }

    await User.findByIdAndUpdate(userId, {
        isVerified : true
    });

    res.status(200).json({
        success: true
    })
})
