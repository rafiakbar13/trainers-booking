import Booking from "../models/BookingSchema";
import User from "../models/UserSchema";
import { Request, Response } from "express";

interface AuthRequest extends Request {
    userId?: string;
}


export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updateUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to updated"
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
}

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const { password, ...rest } = user.toObject();
        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: { ...rest }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user profile"
        })
    }
};

export const getMyAppointment = async (req: AuthRequest, res: Response) => {
    try {
        // step 1: retrieve appointments from booking
        const bookings = await Booking.find({ user: req.userId })
        // step 2: extract trainer id from bookings
        const trainerIds = bookings.map((booking) => booking.trainer.id);
        // step 3: retrieve trainers from trainerIds
        const trainers = await User.find({ _id: { $in: trainerIds } }).select("-password");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments"
        })
    }
};