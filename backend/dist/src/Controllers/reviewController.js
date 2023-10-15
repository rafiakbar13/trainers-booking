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
exports.createReview = exports.getAllReviews = void 0;
const ReviewSchema_1 = __importDefault(require("../models/ReviewSchema"));
const TrainerSchema_1 = __importDefault(require("../models/TrainerSchema"));
// get all reviews
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield ReviewSchema_1.default.find({});
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });
    }
    catch (error) {
        res.status(404).json({ success: false, message: "not found" });
    }
});
exports.getAllReviews = getAllReviews;
// create a review
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.trainer)
        req.body.trainer = req.params.trainerId;
    if (!req.body.user)
        req.body.trainer = req.params.userId;
    const newReview = new ReviewSchema_1.default(req.body);
    try {
        const savedReview = yield newReview.save();
        yield TrainerSchema_1.default.findByIdAndUpdate(req.body.trainer, {
            $push: { reviews: savedReview._id }
        });
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: savedReview
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.createReview = createReview;
