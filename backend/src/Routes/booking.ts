import express from "express";
import { authenticate } from "../auth/verifyToken";
import { getCheckoutSession } from "../Controllers/bookingController";

const router = express.Router();

router.post("/checkout-session/:trainerId", authenticate, getCheckoutSession);

export default router;
