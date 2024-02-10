import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Trainer, { ITrainer } from "../models/TrainerSchema";
import User, { IUser } from "../models/UserSchema";

interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // get token from header
  const authToken = req.headers.authorization;

  // bearer token
  // check if token exists
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "No token found, authorization denied",
    });
  }

  try {
    const token = authToken.split(" ")[1];
    // verify token
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token Expired, authorization denied",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const restrict =
  (roles: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    let user: IUser | ITrainer | undefined;

    const member = await User.findById(userId);
    const trainer = await Trainer.findById(userId);

    if (member) {
      user = member;
    }

    if (trainer) {
      user = trainer;
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    next();
  };
