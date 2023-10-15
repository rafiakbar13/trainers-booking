import mongoose, { Query } from "mongoose";
import Trainer from "./TrainerSchema";
import { IUser } from "./UserSchema";
import { ITrainer } from "./TrainerSchema";
import { Document, Model } from "mongoose";

const reviewSchema: mongoose.Schema = new mongoose.Schema({
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    }
}, { timestamps: true });



interface ReviewDocument extends mongoose.Document {
    trainer: mongoose.Types.ObjectId | ITrainer;
    user: mongoose.Types.ObjectId | IUser;
    reviewText: string;
    rating: number;
}

reviewSchema.pre<Query<ReviewDocument, ReviewDocument>>(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name photo",
    });
    next();
});

reviewSchema.statics.calcAverageRatings = async function (trainerId: mongoose.Types.ObjectId) {
    const stats = await this.aggregate([
        {
            $match: { trainer: trainerId },
        },
        {
            $group: {
                _id: "$trainer",
                numOfRatings: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        }
    ]);
    await Trainer.findByIdAndUpdate(trainerId, {
        totalRating: stats[0].numOfRatings,
        averageRating: stats[0].avgRating,
    });
}



interface ReviewDocument extends Document {
    trainer: mongoose.Types.ObjectId | ITrainer;
    user: mongoose.Types.ObjectId | IUser;
    reviewText: string;
    rating: number;
}

interface ReviewModel extends Model<ReviewDocument> {
    calcAverageRatings(trainerId: mongoose.Types.ObjectId): Promise<void>;
}

reviewSchema.post<ReviewDocument>("save", function () {
    return (this.constructor as ReviewModel).calcAverageRatings(this.trainer as mongoose.Types.ObjectId);
});

reviewSchema.statics.calcAverageRatings = async function (trainerId: mongoose.Types.ObjectId) {
    const stats = await this.aggregate([
        {
            $match: { trainer: trainerId },
        },
        {
            $group: {
                _id: "$trainer",
                numOfRatings: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        }
    ]);
    await Trainer.findByIdAndUpdate(trainerId, {
        totalRating: stats[0].numOfRatings,
        averageRating: stats[0].avgRating,
    });
}

const Review = mongoose.model<ReviewDocument, ReviewModel>("Review", reviewSchema);

export default Review;
