import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/customError';

// Global error handling middleware
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If error is not operational, log it and send generic message
  if (!err.isOperational) {
    console.error('UNHANDLED ERROR:', err);
    return res.status(500).json({ message: 'Something went wrong!' });
  }

  // For operational errors, send detailed error message
  res.status(err.statusCode || 500).json({
    status: err.statusCode < 500 ? 'fail' : 'error',
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
