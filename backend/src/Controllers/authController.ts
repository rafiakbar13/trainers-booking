import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/UserSchema';
import Trainer, { ITrainer } from '../models/TrainerSchema';

const generateToken = (user: IUser | ITrainer) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: '15d' }
    );
};

export const register = async (req: Request, res: Response) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user: IUser | ITrainer | null = null;
        if (role === 'member') {
            user = await User.findOne({ email });
        } else if (role === 'trainer') {
            user = await Trainer.findOne({ email });
        }
        // check if user already exists
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (role === 'member') {
            user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                photo,
            });
        }
        if (role === 'trainer') {
            user = new Trainer({
                name,
                email,
                password: hashedPassword,
                role,
                gender,
                photo,
            });
        }
        if (user) {
            await user.save();
            res.status(201).json({
                success: true,
                message: 'User created successfully',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        let user: IUser | ITrainer | null = null;
        const member = await User.findOne({ email });
        const trainer = await Trainer.findOne({ email });

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
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        // generate token
        const token = generateToken(user);
        const { password, role, appointments, ...rest } = user.toObject();
        res.status(201).json({
            status: true,
            message: 'User logged in successfully',
            token,
            data: { ...rest, role: user.role },
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Failed to login',
        });
    }
};
