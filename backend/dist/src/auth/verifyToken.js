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
exports.restrict = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TrainerSchema_1 = __importDefault(require("../models/TrainerSchema"));
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get token from header
    const authToken = req.headers.authorization;
    // bearer token
    // check if token exists
    if (!authToken || !authToken.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            message: "No token found, authorization denied",
        });
    }
    try {
        const token = authToken.split(" ")[1];
        // verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token Expired",
            });
        }
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
});
exports.authenticate = authenticate;
const restrict = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    let user;
    const member = yield UserSchema_1.default.findById(userId);
    const trainer = yield TrainerSchema_1.default.findById(userId);
    if (member) {
        user = member;
    }
    if (trainer) {
        user = trainer;
    }
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }
    if (!roles.includes(user.role)) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized",
        });
    }
    next();
});
exports.restrict = restrict;
