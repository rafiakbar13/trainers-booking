import request from 'supertest';
import { app, connectDB } from '../src/app';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;


describe('Test Trainer API Endpoints', async () => {

    beforeAll(async () => {
        const mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();
        await mongoose.createConnection(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });


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
    it('should get a single trainer', async () => {
        const response = await request(app).get('/api/v1/trainers/65253a10f57c3d7b73b9c6bb');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Trainer found successfully');
    });
    // ! negative test case single trainer
    it('should get a single trainer', async () => {
        const response = await request(app).get('/api/v1/trainers/65253a10f57c3d7b73b9caa');
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Trainer not found');
    });
});
