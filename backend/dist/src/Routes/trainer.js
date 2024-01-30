"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trainerController_1 = require("../Controllers/trainerController");
const verifyToken_1 = require("../auth/verifyToken");
const review_1 = __importDefault(require("./review"));
const router = express_1.default.Router();
router.use("/:trainerId/reviews", review_1.default);
router.get("/", trainerController_1.getAllTrainers);
router.get("/:id", trainerController_1.getSingleTrainer);
router.put("/:id", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["trainer"]), trainerController_1.updateTrainer);
router.delete("/:id", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["trainer"]), trainerController_1.deleteTrainer);
router.get("/profile/me", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["trainer"]), trainerController_1.getMyTrainer);
exports.default = router;
