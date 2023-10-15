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
exports.server = exports.connectDB = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./Routes/auth"));
const user_1 = __importDefault(require("./Routes/user"));
const trainer_1 = __importDefault(require("./Routes/trainer"));
const review_1 = __importDefault(require("./Routes/review"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const corsOptions = {
    origin: true,
};
mongoose_1.default.set("strictQuery", false);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (error) {
        console.info('Failed to connect to MongoDB.');
        throw error;
    }
});
exports.connectDB = connectDB;
exports.app.get('/', (req, res) => {
    res.send(`API is running...`);
});
// middleware
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use('/api/v1/auth', auth_1.default);
exports.app.use('/api/v1/users', user_1.default);
exports.app.use('/api/v1/trainers', trainer_1.default);
exports.app.use('/api/v1/reviews', review_1.default);
exports.server = exports.app.listen(port, () => {
    (0, exports.connectDB)();
    console.log(`Server started at http://localhost:${port}`);
});
