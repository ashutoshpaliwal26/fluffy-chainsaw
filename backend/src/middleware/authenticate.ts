import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User"; // Assuming User model exports the IUser interface too
import { getToken } from "../utils/jwtService"; // Renamed for clarity

// It's good practice to extend Express's Request interface
// to add your custom properties like `user`.
declare global {
  namespace Express {
    interface Request {
      user?: import('../models/User').IUser; // Use the actual type from your model
    }
  }
}

export const adminAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // 1. Check for the Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401); // 401 Unauthorized
    throw new Error("Not authorized, no token or invalid token format");
  }

  // 2. Extract the token
  const token = authHeader.split(" ")[1];

  // 3. Verify the token and get the payload
  const payload = getToken(token); // Assuming your JWT service has a verify function
  if (!payload || typeof payload !== "object" || !("_id" in payload)) {
    res.status(401);
    throw new Error("Not authorized, token payload is invalid");
  }

  // 4. Find the user in the database based on the token's _id
  const user = await User.findById(payload._id);

  // 5. Check if the user exists
  if (!user) {
    res.status(401);
    throw new Error("Not authorized, user not found");
  }

  // 6. CRITICAL: Check if the user has the 'admin' role
  if (user.role !== 'admin') {
    res.status(403); // 403 Forbidden - user is known, but lacks permission
    throw new Error("Not authorized, you do not have admin privileges");
  }

  // 7. Success! Attach user to the request object for later use and proceed
  req.user = user;
  next();
});


export const userAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  // 1. Check for the Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401); // 401 Unauthorized
    throw new Error("Not authorized, no token or invalid token format");
  }

  // 2. Extract the token
  const token = authHeader.split(" ")[1];

  // 3. Verify the token and get the payload
  const payload = getToken(token); // Assuming your JWT service has a verify function
  if (!payload || typeof payload !== "object" || !("_id" in payload)) {
    res.status(401);
    throw new Error("Not authorized, token payload is invalid");
  }

  // 4. Find the user in the database based on the token's _id
  const user = await User.findById(payload._id);

  // 5. Check if the user exists
  if (!user) {
    res.status(401);
    throw new Error("Not authorized, user not found");
  }

  if(user.role === 'admin'){
    req.user = user;
    next();
    return;
  }
  // 6. CRITICAL: Check if the user has the 'admin' role
  if (user.role !== 'user') {
    res.status(403); // 403 Forbidden - user is known, but lacks permission
    throw new Error("Not authorized, you do not have admin privileges");
  }

  // 7. Success! Attach user to the request object for later use and proceed
  req.user = user;
  next();
});