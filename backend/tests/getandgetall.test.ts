import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../src/index'; // Adjust path based on your project structure
import Passenger from '../src/models/passenger'; // Adjust path based on your project structure

describe('GET /api/passengers API Endpoints', () => {
  let passengerId: string;

  // Seed database with a sample passenger data
  beforeAll(async () => {
    const samplePassenger = new Passenger({
      title: 'MR',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    });
    const savedPassenger = (await samplePassenger.save()) as { _id: string };
    passengerId = savedPassenger._id.toString();
  });

  // Clean up and close server after all tests
  afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
  });

  it('should get a single passenger by ID', async () => {
    const samplePassenger = new Passenger({
      title: 'MR',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    });
    const savedPassenger = (await samplePassenger.save()) as { _id: string };

    const res = await request(app).get(`/api/passengers/${savedPassenger._id}`);

    expect(res.status).toBe(200);

    expect(res.body._id).toBe(savedPassenger._id.toString());
    expect(res.body.title).toBe('MR');
    expect(res.body.firstName).toBe('Hamza');
    expect(res.body.lastName).toBe('Arshad');

    await Passenger.findByIdAndDelete(savedPassenger._id);
  });

  it('should return 404 if passenger ID is not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const res = await request(app).get(`/api/passengers/${nonExistentId}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Passenger not found.');
  });

  it('should get all passengers', async () => {
    const res = await request(app).get('/api/passengers');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return an empty array if no passengers exist', async () => {
    const res = await request(app).get('/api/passengers');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

    await Passenger.findByIdAndDelete(passengerId);
  });
});
