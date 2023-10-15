import express from "express";
import {
    getAllReviews,
    createReview
} from "../Controllers/reviewController";
import { authenticate, restrict } from "../auth/verifyToken";

const router = express.Router({ mergeParams: true });
// trainer/trainerId/reviews

router
    .route("/")
    .get(getAllReviews)
    .post(authenticate, restrict(["member"]), createReview);

export default router;