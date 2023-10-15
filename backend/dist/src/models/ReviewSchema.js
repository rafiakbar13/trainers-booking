"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TrainerSchema_1 = __importDefault(require("./TrainerSchema"));
const reviewSchema = new mongoose_1.default.Schema({
    trainer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Trainer",
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name photo",
    });
    next();
});
reviewSchema.statics.calcAverageRatings = function (trainerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = yield this.aggregate([
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
        yield TrainerSchema_1.default.findByIdAndUpdate(trainerId, {
            totalRating: stats[0].numOfRatings,
            averageRating: stats[0].avgRating,
        });
    });
};
reviewSchema.post("save", function () {
    return this.constructor.calcAverageRatings(this.trainer);
});
reviewSchema.statics.calcAverageRatings = function (trainerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = yield this.aggregate([
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
        yield TrainerSchema_1.default.findByIdAndUpdate(trainerId, {
            totalRating: stats[0].numOfRatings,
            averageRating: stats[0].avgRating,
        });
    });
};
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
