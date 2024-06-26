import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../src/index'; // Adjust path based on your project structure
import Passenger from '../src/models/passenger'; // Adjust path based on your project structure

describe('PUT /api/passengers/:id API Endpoints', () => {
  let passengerId: string;

  // Create a passenger before running the tests to have an entity to update
  beforeAll(async () => {
    const newPassenger = new Passenger({
      title: 'mr',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    });
    const savedPassenger = (await newPassenger.save()) as { _id: string };
    passengerId = savedPassenger._id.toString();
  });

  afterEach(async () => {
    await Passenger.deleteMany({});
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await Passenger.deleteMany({});
    await server.close();
    await mongoose.disconnect();
  });

  it('should update passenger data with valid fields', async () => {
    const updatedData = {
      title: 'mr',
      firstName: 'Bilal',
      lastName: 'Arshad',
      street: 'Oberfield',
      zipcode: '12683',
      city: 'Berlin',
      email: 'bilal.arshad1008@gmail.com',
      phone: '017656952192',
    };

    let updatedPassenger = await Passenger.findById(passengerId);

    expect(updatedPassenger?.hasUpdated).toBe(false);

    const res = await request(app)
      .put(`/api/passengers/${passengerId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.firstName).toBe(updatedData.firstName);
    expect(res.body.street).toBe(updatedData.street);
    expect(res.body.zipcode).toBe(updatedData.zipcode);
    expect(res.body.email).toBe(updatedData.email);

    updatedPassenger = await Passenger.findById(passengerId);

    expect(updatedPassenger?.hasUpdated).toBe(true);
  });
});
