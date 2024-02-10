import Review from "../models/ReviewSchema";
import Trainer from "../models/TrainerSchema";
import { Request, Response } from "express";

interface UserId extends Request {
  userId?: string;
}

// get all reviews
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not found" });
  }
};

// create a review
export const createReview = async (req: UserId, res: Response) => {
  if (!req.body.trainer) req.body.trainer = req.params.trainerId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    await Trainer.findByIdAndUpdate(req.body.trainer, {
      $push: { reviews: savedReview._id },
    });
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: savedReview,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
