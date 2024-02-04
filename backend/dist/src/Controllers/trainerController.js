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
exports.getMyTrainer = exports.getAllTrainers = exports.getSingleTrainer = exports.deleteTrainer = exports.updateTrainer = void 0;
const TrainerSchema_1 = __importDefault(require("../models/TrainerSchema"));
const BookingSchema_1 = __importDefault(require("../models/BookingSchema"));
const updateTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const updateTrainer = yield TrainerSchema_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Trainer updated successfully",
            data: updateTrainer,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update trainer",
        });
    }
});
exports.updateTrainer = updateTrainer;
const deleteTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield TrainerSchema_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Trainer deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete trainer",
        });
    }
});
exports.deleteTrainer = deleteTrainer;
const getSingleTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const trainer = yield TrainerSchema_1.default.findById(id)
            .populate("reviews")
            .select("-password");
        res.status(200).json({
            success: true,
            message: "Trainer found successfully",
            data: trainer,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Trainer not found",
        });
    }
});
exports.getSingleTrainer = getSingleTrainer;
const getAllTrainers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        let trainers;
        if (query) {
            trainers = yield TrainerSchema_1.default.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        }
        else {
            trainers = yield TrainerSchema_1.default.find({
                isApproved: "pending",
            }).select("-password ");
        }
        res.status(200).json({
            success: true,
            message: "Trainers found successfully",
            data: trainers,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
});
exports.getAllTrainers = getAllTrainers;
const getMyTrainer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainerId = req.userId;
    try {
        const trainer = yield TrainerSchema_1.default.findById(trainerId);
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer not found",
            });
        }
        const _a = trainer.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
        const appointments = yield BookingSchema_1.default.find({ trainer: trainerId });
        res.status(200).json({
            success: true,
            message: "Trainer fetched successfully",
            data: Object.assign(Object.assign({}, rest), { appointments }),
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch trainer",
        });
    }
});
exports.getMyTrainer = getMyTrainer;
