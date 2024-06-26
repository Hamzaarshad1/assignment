import { Schema, model, Document } from 'mongoose';

export interface IPassenger extends Document {
  title: string;
  gender: string;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: string;
  city: string;
  email: string;
  phone: string;
  DOB: Date;
  hasUpdated: boolean;
}

const passengerSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    street: {
      type: String,
      required: [true, 'Street is required'],
      trim: true,
    },
    zipcode: {
      type: String,
      required: [true, 'Zipcode is required'],
      trim: true,
      match: [/^\d{5}(-\d{4})?$/, 'Zipcode must be a valid format'], // Example US zipcode format
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\d{12}$/, 'Phone number must be a valid format'],
    },
    DOB: {
      type: String,
      required: false,
      match: [/^\d{4}-\d{2}-\d{2}$/, 'DOB must be in YYYY-MM-DD format'], // Example date format
    },
    hasUpdated: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        // Remove fields '__v' and 'hasUpdated' from output
        delete ret.__v;
      },
    },
  }
);

export default model<IPassenger>('Passenger', passengerSchema);
