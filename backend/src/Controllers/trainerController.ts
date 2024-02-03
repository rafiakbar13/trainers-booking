import { Request, Response } from "express";
import Trainer from "../models/TrainerSchema";
import Booking from "../models/BookingSchema";

interface AuthRequest extends Request {
  userId?: string;
}

export const updateTrainer = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updateTrainer = await Trainer.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      data: updateTrainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update trainer",
    });
  }
};

export const deleteTrainer = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await Trainer.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete trainer",
    });
  }
};

export const getSingleTrainer = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const trainer = await Trainer.findById(id)
      .populate("reviews")
      .select("-password");
    res.status(200).json({
      success: true,
      message: "Trainer found successfully",
      data: trainer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Trainer not found",
    });
  }
};

export const getAllTrainers = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    let trainers;
    if (query) {
      trainers = await Trainer.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      trainers = await Trainer.find({
        isApproved: "pending",
      }).select("-password ");
    }
    res.status(200).json({
      success: true,
      message: "Trainers found successfully",
      data: trainers,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getMyTrainer = async (req: AuthRequest, res: Response) => {
  const trainerId = req.userId;
  try {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }
    const { password, ...rest } = trainer.toObject();
    const appointments = await Booking.find({ trainer: trainerId });
    res.status(200).json({
      success: true,
      message: "Trainer fetched successfully",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch trainer",
    });
  }
};
