import express from "express";
import {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUsers,
    getMyAppointment,
    getUserProfile
} from "../Controllers/userController";
import { authenticate, restrict } from "../auth/verifyToken";

const router = express.Router();

router.get("/", authenticate, restrict(["admin"]), getAllUsers);
router.get("/:id", authenticate, restrict(["member"]), getSingleUser);
router.put("/:id", authenticate, restrict(["member"]), updateUser);
router.delete("/:id", authenticate, restrict(["admin"]), deleteUser);

router.get("/profile/me", authenticate, restrict(["member"]), getUserProfile);
router.get("/appointments/my-appointments", authenticate, restrict(["member"]), getMyAppointment);

export default router;