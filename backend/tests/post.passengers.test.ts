import request from 'supertest';
import mongoose from 'mongoose';
import { app, server } from '../src/index'; // Adjust path based on your project structure
import Passenger from '../src/models/passenger'; // Adjust path based on your project structure

describe('Post passenger API Endpoints', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await server.close();
    await mongoose.disconnect(); // Ensure Mongoose disconnects at the end
  });

  it('should not create a passenger with empty data body', async () => {
    const res = await request(app).post('/api/passengers').send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Title is required');
  });

  it('should not create a passenger if title is invalid', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR1',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Title can only be ["mr", "mrs"]');
  });

  it('should not create a passengerif first name is missing', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('First name is required');
  });

  it('should not create a passengerif first name is empty', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR',
      firstName: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('First name cannot be empty');
  });

  it('should not create a passengerif last name is missing', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Last name is required');
  });

  it('should not create a passengerif last name is empty', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Last name cannot be empty');
  });

  it('should not create a passenger if street is missing', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR',
      firstName: 'Hamza',
      lastName: 'Arshad',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Street is required');
  });

  it('should not create a passenger if street is empty string', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: '',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Street cannot be empty');
  });

  it('should not create a passenger if Zipcode is missing', async () => {
    const res = await request(app).post('/api/passengers').send({
      title: 'MR',
      gender: 'Male',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'xyz street',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Zipcode is required');
  });

  it('should not create a passenger if Zipcode is empty', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if Zipcode cannot be alphabet', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if City is missing', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if City is empty', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if Email is missing', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if Email is empty', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if Email is invalid', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if Phone number is missing', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if Phone number is empty', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if Phone number is invalid', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should not create a passenger if optional field DOB should ne in valid format', async () => {
    const res = await request(app).post('/api/passengers').send({
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

  it('should create a new passengers with valid body', async () => {
    const pessengerData = {
      title: 'mr',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    };

    const response = await request(app)
      .post('/api/passengers')
      .send(pessengerData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(pessengerData.title);
    expect(response.body.firstName).toBe(pessengerData.firstName);
    expect(response.body.lastName).toBe(pessengerData.lastName);
    expect(response.body.street).toBe(pessengerData.street);
    expect(response.body.zipcode).toBe(pessengerData.zipcode);
    expect(response.body.city).toBe(pessengerData.city);
    expect(response.body.email).toBe(pessengerData.email);
    expect(response.body.phone).toBe(pessengerData.phone);

    const passenger = await Passenger.findById(response.body._id);
    expect(passenger).toBeTruthy();

    await Passenger.findByIdAndDelete(response.body._id);
  });

  it('should create a new passengers with valid and optional field body', async () => {
    const pessengerData = {
      title: 'mr',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
      DOB: '1997-08-10',
    };

    const response = await request(app)
      .post('/api/passengers')
      .send(pessengerData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(pessengerData.title);
    expect(response.body.firstName).toBe(pessengerData.firstName);
    expect(response.body.lastName).toBe(pessengerData.lastName);
    expect(response.body.street).toBe(pessengerData.street);
    expect(response.body.zipcode).toBe(pessengerData.zipcode);
    expect(response.body.city).toBe(pessengerData.city);
    expect(response.body.email).toBe(pessengerData.email);
    expect(response.body.phone).toBe(pessengerData.phone);

    const passenger = await Passenger.findById(response.body._id);
    expect(passenger).toBeTruthy();

    await Passenger.findByIdAndDelete(response.body._id);
  });

  it('should create a new passengers with valid body and small case title', async () => {
    const pessengerData = {
      title: 'mr',
      firstName: 'Hamza',
      lastName: 'Arshad',
      street: 'wex-str',
      zipcode: '10715',
      city: 'Berlin',
      email: 'hamza.arshad1008@gmail.com',
      phone: '017656952192',
    };

    const response = await request(app)
      .post('/api/passengers')
      .send(pessengerData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(pessengerData.title);
    expect(response.body.firstName).toBe(pessengerData.firstName);
    expect(response.body.lastName).toBe(pessengerData.lastName);
    expect(response.body.street).toBe(pessengerData.street);
    expect(response.body.zipcode).toBe(pessengerData.zipcode);
    expect(response.body.city).toBe(pessengerData.city);
    expect(response.body.email).toBe(pessengerData.email);
    expect(response.body.phone).toBe(pessengerData.phone);

    const passenger = await Passenger.findById(response.body._id);
    expect(passenger).toBeTruthy();

    await Passenger.findByIdAndDelete(response.body._id);
  });

  it('should not create new passenger if title is invalid', async () => {
    const pessengerData = {
      title: 'MR1',
      firstName: 'Hamza',
      lastName: 'Arshad',
      DOB: '08.10.1995',
    };

    const response = await request(app)
      .post('/api/passengers')
      .send(pessengerData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Title can only be ["mr", "mrs"]');
  });
});
