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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const TrainerSchema_1 = __importDefault(require("../models/TrainerSchema"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        if (role === 'member') {
            user = yield UserSchema_1.default.findOne({ email });
        }
        else if (role === 'trainer') {
            user = yield TrainerSchema_1.default.findOne({ email });
        }
        // check if user already exists
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        // hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        if (role === 'member') {
            user = new UserSchema_1.default({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                photo,
            });
        }
        if (role === 'trainer') {
            user = new TrainerSchema_1.default({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                photo,
            });
        }
        if (user) {
            yield user.save();
            res.status(201).json({
                success: true,
                message: 'User created successfully',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        let user = null;
        const member = yield UserSchema_1.default.findOne({ email });
        const trainer = yield TrainerSchema_1.default.findOne({ email });
        if (member) {
            user = member;
        }
        if (trainer) {
            user = trainer;
        }
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist',
            });
        }
        // compare password
        const isPasswordMatch = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        // generate token
        const token = generateToken(user);
        const _a = user.toObject(), { password, role, appointments } = _a, rest = __rest(_a, ["password", "role", "appointments"]);
        res.status(201).json({
            status: true,
            message: 'User logged in successfully',
            token,
            data: Object.assign(Object.assign({}, rest), { role: user.role }),
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to login',
        });
    }
});
exports.login = login;
