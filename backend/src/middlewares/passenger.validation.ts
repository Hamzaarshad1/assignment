import Joi from 'joi';
import { IPassenger } from '../models/passenger';

const allowedTitles = ['mr', 'mrs'];

export const PassengerSchema = Joi.object<IPassenger>({
  title: Joi.string()
    .valid(...allowedTitles)
    .insensitive()
    .required()
    .messages({
      'any.required': 'Title is required',
      'any.only': 'Title can only be ["mr", "mrs"]',
    }),
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'First name is required',
    'string.empty': 'First name cannot be empty',
  }),
  lastName: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'Last name is required',
    'string.empty': 'Last name cannot be empty',
  }),
  street: Joi.string().trim().required().messages({
    'any.required': 'Street is required',
    'string.empty': 'Street cannot be empty',
  }),
  zipcode: Joi.string()
    .trim()
    .pattern(/^\d{5}(-\d{4})?$/)
    .required()
    .messages({
      'any.required': 'Zipcode is required',
      'string.empty': 'Zipcode cannot be empty',
      'string.pattern.base':
        'Zipcode must be in a valid format (e.g., 12345 or 12345-6789)',
    }),
  city: Joi.string().trim().min(2).max(50).required().messages({
    'any.required': 'City is required',
    'string.empty': 'City cannot be empty',
  }),
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } }) // Valid email
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email address',
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^\d{12}$/)
    .required()
    .messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must contain 12 digits',
    }),
  DOB: Joi.date().optional().iso().messages({
    'date.base': 'DOB must be a valid date',
    'date.format': 'DOB must be in YYYY-MM-DD format',
  }),
});

export const PassengerIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(), // MongoDB ObjectId is a 24-character hex string
});
