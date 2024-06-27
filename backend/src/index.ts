import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'; // Import the cors middleware
import bodyParser from 'body-parser';
import pessengerRouter from './routes/pessengerRoutes';
import connectDB from './config/db.config';
import { NotFoundError } from './utils/customError';
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 0;

// CORS Configuration
const corsOptions = {
  origin: '*', // Allow all origins for development. Change this in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Apply the CORS middleware
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
  });
});

// User routes
app.use('/api/passengers', pessengerRouter);

// Fallback for unknown routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server!`));
});

// Global error handling middleware
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, server };
