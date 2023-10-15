"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const verifyToken_1 = require("../auth/verifyToken");
const router = express_1.default.Router();
router.get("/", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["admin"]), userController_1.getAllUsers);
router.get("/:id", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["member"]), userController_1.getSingleUser);
router.put("/:id", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["member"]), userController_1.updateUser);
router.delete("/:id", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["admin"]), userController_1.deleteUser);
router.get("/profile/me", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["member"]), userController_1.getUserProfile);
router.get("/appointments/my-appointments", verifyToken_1.authenticate, (0, verifyToken_1.restrict)(["member"]), userController_1.getMyAppointment);
exports.default = router;
