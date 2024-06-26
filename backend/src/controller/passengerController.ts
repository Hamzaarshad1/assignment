import { NextFunction, Request, Response } from 'express';
import * as passengerService from '../service/passengerService';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../utils/customError';

// Create a new passenger
export const createPassenger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPassenger = await passengerService.createPassenger(req.body);

    const response = {
      _id: newPassenger._id,
      title: newPassenger.title,
      gender: newPassenger.gender,
      firstName: newPassenger.firstName,
      lastName: newPassenger.lastName,
      street: newPassenger.street,
      zipcode: newPassenger.zipcode,
      city: newPassenger.city,
      email: newPassenger.email,
      phone: newPassenger.phone,
      DOB: newPassenger.DOB,
    };
    res.status(201).json(response);
  } catch (error: any) {
    next(error);
  }
};

// Get all passenger
export const getAllPassenger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passengers = await passengerService.getAllPassenger();

    res.status(200).json(passengers);
  } catch (error) {
    next(new InternalServerError('Internal server error.'));
  }
};

// Get a passenger by ID
export const getPassengerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passenger = await passengerService.getPassengerById(req.params.id);
    if (!passenger) {
      throw new NotFoundError('Passenger not found.');
    }

    const response = {
      _id: passenger._id,
      title: passenger.title,
      gender: passenger.gender,
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      street: passenger.street,
      zipcode: passenger.zipcode,
      city: passenger.city,
      email: passenger.email,
      phone: passenger.phone,
      DOB: passenger.DOB,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Update a passenger by ID
export const updatePassenger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passenger = await passengerService.getPassengerById(req.params.id);

    if (!passenger) {
      throw new NotFoundError('Passenger not found.');
    }
    if (passenger?.hasUpdated) {
      throw new BadRequestError('Data has been already updated.');
    }

    const updatedPassenger = await passengerService.updatePassenger(
      req.params.id,
      req.body
    );

    res.status(200).json(updatedPassenger);
  } catch (error) {
    next(error);
  }
};
