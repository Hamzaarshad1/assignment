import Passenger from '../models/passenger';
import { IPassenger } from '../models/passenger';

// Create a new pessenger
export const createPassenger = async (pessenger: IPassenger) => {
  return (await Passenger.create(pessenger)) as IPassenger;
};

// Get all passengers
export const getAllPassenger = async () => {
  return await Passenger.find().select('-hasUpdated');
};

// Get a pessenger by ID
export const getPassengerById = async (
  id: string
): Promise<IPassenger | null> => {
  return await Passenger.findById(id);
};

// Update a pessenger by ID
export const updatePassenger = async (
  id: string,
  update: Partial<IPassenger>
) => {
  return await Passenger.findByIdAndUpdate(
    id,
    { ...update, hasUpdated: true },
    { new: true }
  );
};
