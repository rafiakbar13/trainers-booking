"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../Controllers/reviewController");
const verifyToken_1 = require("../auth/verifyToken");
const router = express_1.default.Router({ mergeParams: true });
// trainer/trainerId/reviews
router
    .route("/")
    .get(reviewController_1.getAllReviews)
    .post(verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["member"]), reviewController_1.createReview);
exports.default = router;
