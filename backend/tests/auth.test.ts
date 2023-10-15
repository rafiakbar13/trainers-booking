import request from 'supertest';
import { app, connectDB } from '../src/app';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions
    );
});


afterAll(async () => {
    await mongoServer.stop();
});

describe('Test Auth API Endpoints', () => {
    // todo positive test case
    it('should register a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456',
            role: 'member',
        }
        const response = await request(app).post('/api/v1/auth/register').send(userData);
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User created successfully');
    }, 50000);
});