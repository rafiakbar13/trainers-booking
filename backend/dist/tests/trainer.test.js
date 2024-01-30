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
describe('Test Trainer API Endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongo.getUri();
        yield mongoose_1.default.createConnection(uri);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    //! negative test case
    // it('should failed update a trainer', async () => {
    //     const trainerData = {
    //         name: 'John Doe',
    //         email: 'johndoe@example.com',
    //     };
    //     // Kirim permintaan PUT ke endpoint /api/trainers/:id
    //     const response = await request(app)
    //         .put('/api/v1/trainers/65253a10f57c3d7b73b9c6bb')
    //         .send(trainerData);
    //     expect(response.status).toBe(401);
    //     expect(response.body.success).toBe(false);
    //     expect(response.body.message).toBe('No token found, authorization denied');
    // });
    //! negative test case
    // it('should failed delete a trainer', async () => {
    //     // Kirim permintaan DELETE ke endpoint /api/trainers/:id
    //     const response = await request(app).delete('/api/v1/trainers/65253a10f57c3d7b73b9c6bb');
    //     expect(response.status).toBe(401);
    //     expect(response.body.success).toBe(false);
    //     expect(response.body.message).toBe('No token found, authorization denied');
    // });
    // todo positive test case
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
        expect(response.body.message).toBe('Trainer not found');
    }));
}));
