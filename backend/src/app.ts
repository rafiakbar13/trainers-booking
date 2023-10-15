import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './Routes/auth';
import userRouter from './Routes/user';
import trainerRouter from './Routes/trainer';
import reviewRouter from './Routes/review';
dotenv.config();

export const app: express.Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const corsOptions: CorsOptions = {
    origin: true,
};

mongoose.set("strictQuery", false);

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions
        );
    } catch (error) {
        console.info('Failed to connect to MongoDB.');
        throw error;
    }
};

app.get('/', (req: Request, res: Response) => {
    res.send(`API is running...`);
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/trainers', trainerRouter);
app.use('/api/v1/reviews', reviewRouter);


export const server = app.listen(port, () => {
    connectDB();
    console.log(`Server started at http://localhost:${port}`);
});