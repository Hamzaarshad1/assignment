import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../src/index'; // Adjust path based on your project structure
import Passenger from '../src/models/passenger'; // Adjust path based on your project structure

describe('PUT /api/passengers/:id API Endpoints', () => {
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

    const passengerId = savedPassenger._id.toString();

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

  it('should update passenger data and set hasupdate to true with valid fields', async () => {
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

    const savedPassenger = (await newPassenger.save()) as {
      _id: string;
      hasUpdated: boolean;
    };

    expect(savedPassenger.hasUpdated).toBe(false);

    const updatedData = {
      title: 'mr',
      firstName: 'Arslan',
      lastName: 'Ahad',
      street: 'Ober-str',
      zipcode: '12683',
      city: 'Berlin',
      email: 'arslan.ahad@gmail.com',
      phone: '017656952195',
    };

    const res = await request(app)
      .put(`/api/passengers/${savedPassenger._id}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.firstName).toBe(updatedData.firstName);
    expect(res.body.street).toBe(updatedData.street);
    expect(res.body.zipcode).toBe(updatedData.zipcode);
    expect(res.body.city).toBe(updatedData.city);
    expect(res.body.email).toBe(updatedData.email);
    expect(res.body.phone).toBe(updatedData.phone);

    const updatedPassenger = await Passenger.findById(savedPassenger._id);

    expect(updatedPassenger?.hasUpdated).toBe(true);
  });

  it('should update passenger data only once', async () => {
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

    const savedPassenger = (await newPassenger.save()) as {
      _id: string;
      hasUpdated: boolean;
    };

    expect(savedPassenger.hasUpdated).toBe(false);

    let updatedData = {
      title: 'mr',
      firstName: 'Arslan',
      lastName: 'Ahad',
      street: 'Ober-str',
      zipcode: '12683',
      city: 'Berlin',
      email: 'arslan.ahad@gmail.com',
      phone: '017656952195',
    };

    let res = await request(app)
      .put(`/api/passengers/${savedPassenger._id}`)
      .send(updatedData);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.firstName).toBe(updatedData.firstName);
    expect(res.body.street).toBe(updatedData.street);
    expect(res.body.zipcode).toBe(updatedData.zipcode);
    expect(res.body.city).toBe(updatedData.city);
    expect(res.body.email).toBe(updatedData.email);
    expect(res.body.phone).toBe(updatedData.phone);

    const updatedPassenger = await Passenger.findById(savedPassenger._id);

    expect(updatedPassenger?.hasUpdated).toBe(true);

    updatedData = {
      title: 'mr',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    };

    res = await request(app)
      .put(`/api/passengers/${savedPassenger._id}`)
      .send(updatedData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Data has been already updated.');
  });

  it('should not update passenger with invalid ID format', async () => {
    const invalidId = '12345';
    const updatedData = {
      title: 'mr',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    };

    const res = await request(app)
      .put(`/api/passengers/${invalidId}`)
      .send(updatedData);

    expect(res.status).toBe(500);
    expect(res.body.message).toContain('Something went wrong!');
  });

  it('should not update passenger if ID does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const updatedData = {
      title: 'mr',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    };

    const res = await request(app)
      .put(`/api/passengers/${nonExistentId}`)
      .send(updatedData);

    expect(res.status).toBe(404);
    expect(res.body.message).toContain('Passenger not found');
  });

  it('should not update passenger with empty data body', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app)
      .put(`/api/passengers/${passengerId}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Title is required');
  });

  it('should not update passenger if title is invalid', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR1',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Title can only be ["mr", "mrs"]');
  });

  it('should not update passenger if first name is missing', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await await request(app)
      .put(`/api/passengers/${passengerId}`)
      .send({
        title: 'MR',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('First name is required');
  });

  it('should not update passenger if first name is empty', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      firstName: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('First name cannot be empty');
  });

  it('should not update passengerif last name is missing', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Last name is required');
  });

  it('should not update passengerif last name is empty', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Last name cannot be empty');
  });

  it('should not update passenger if street is missing', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      firstName: 'Hamza',
      lastName: 'Arshad',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Street is required');
  });

  it('should not update passenger if street is empty string', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Street cannot be empty');
  });

  it('should not update passenger if Zipcode is missing', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Zipcode is required');
  });

  it('should not update passenger if Zipcode is empty', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Zipcode cannot be empty');
  });

  it('should not update passenger if Zipcode cannot be alphabet', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: 'abcde',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain(
      'Zipcode must be in a valid format (e.g., 12345 or 12345-6789)'
    );
  });

  it('should not update passenger if City is missing', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('City is required');
  });

  it('should not update passenger if City is empty', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('City cannot be empty');
  });

  it('should not update passenger if Email is missing', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: 'Berlin',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Email is required');
  });

  it('should not update passenger if Email is empty', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: 'Berlin',
      email: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Email cannot be empty');
  });

  it('should not update passenger if Email is invalid', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: 'Berlin',
      email: 'hello.12',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Email must be a valid email address');
  });

  it('should not update passenger if Phone number is missing', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: 'Berlin',
      email: 'hamza@gmail.com',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Phone number is required');
  });

  it('should not update passenger if Phone number is empty', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: 'Berlin',
      email: 'hamza@gmail.com',
      phone: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Phone number cannot be empty');
  });

  it('should not update passenger if Phone number is invalid', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: 'Berlin',
      email: 'hamza@gmail.com',
      phone: '123456789',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Phone number must contain 12 digits');
  });

  it('should not update passenger if optional field DOB should ne in valid format', async () => {
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

    const passengerId = savedPassenger._id.toString();

    const res = await request(app).put(`/api/passengers/${passengerId}`).send({
      title: 'MR',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
      zipcode: '12345',
      city: 'Berlin',
      email: 'hamza@gmail.com',
      phone: '123456789987',
      DOB: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('DOB must be in YYYY-MM-DD format');
  });
});
