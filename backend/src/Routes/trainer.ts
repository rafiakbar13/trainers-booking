import express from "express";
import {
  updateTrainer,
  deleteTrainer,
  getSingleTrainer,
  getAllTrainers,
  getMyTrainer,
} from "../Controllers/trainerController";
import { authenticate, restrict } from "../auth/verifyToken";
import reviewRouter from "./review";
const router = express.Router();

router.use("/:trainerId/reviews", reviewRouter);

router.get("/", getAllTrainers);
router.get("/:id", getSingleTrainer);
router.put("/:id", authenticate, restrict(["trainer"]), updateTrainer);
router.delete("/:id", authenticate, restrict(["trainer"]), deleteTrainer);

router.get("/profile/me", authenticate, restrict(["trainer"]), getMyTrainer);
export default router;
