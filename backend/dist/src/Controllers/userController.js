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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyAppointment = exports.getUserProfile = exports.getAllUsers = exports.getSingleUser = exports.deleteUser = exports.updateUser = void 0;
const BookingSchema_1 = __importDefault(require("../models/BookingSchema"));
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const updateUser = yield UserSchema_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updateUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to updated",
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield UserSchema_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
});
exports.deleteUser = deleteUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield UserSchema_1.default.findById(id).select("-password");
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
});
exports.getSingleUser = getSingleUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserSchema_1.default.find({}).select("-password");
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield UserSchema_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const _a = user.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: Object.assign({}, rest),
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user profile",
        });
    }
});
exports.getUserProfile = getUserProfile;
const getMyAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // step 1: retrieve appointments from booking
        const bookings = yield BookingSchema_1.default.find({ user: req.userId });
        // step 2: extract trainer id from bookings
        const trainerIds = bookings.map((booking) => booking.trainer.id);
        // step 3: retrieve trainers from trainerIds
        const trainers = yield UserSchema_1.default.find({ _id: { $in: trainerIds } }).select("-password");
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
        });
    }
});
exports.getMyAppointment = getMyAppointment;
