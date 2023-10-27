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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongo.getUri();
    yield mongoose_1.default.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoServer.stop();
}));
describe('Test Auth API Endpoints', () => {
    // todo positive test case
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456',
            role: 'member',
        };
        const response = yield (0, supertest_1.default)(app_1.app).post('/api/v1/auth/register').send(userData);
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User created successfully');
    }), 50000);
});
