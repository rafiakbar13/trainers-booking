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
const app_1 = require("../../src/app"); // Gantilah dengan jalur yang sesuai
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, app_1.connectDB)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(() => resolve(), 500));
}));
describe('Test Trainer API Endpoints', () => {
    // negative test case
    it('should update a trainer', () => __awaiter(void 0, void 0, void 0, function* () {
        // Buat data trainer yang akan diuji
        const trainerData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
        };
        // Kirim permintaan PUT ke endpoint /api/trainers/:id
        const response = yield (0, supertest_1.default)(app_1.app)
            .put('/api/v1/trainers/65253a10f57c3d7b73b9c6bb')
            .send(trainerData);
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('No token found, authorization denied');
    }));
    it('should get all trainers', () => __awaiter(void 0, void 0, void 0, function* () {
        // Kirim permintaan GET ke endpoint /api/trainers
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/trainers');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Trainers found successfully');
    }));
    // ! positive test case single trainer
    it('should get a single trainer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/trainers/65253a10f57c3d7b73b9c6bb');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Trainer found successfully');
    }));
    // ! negative test case single trainer
    it('should get a single trainer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/trainers/65253a10f57c3d7b73b9caa');
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Trainer not found ');
    }));
});
