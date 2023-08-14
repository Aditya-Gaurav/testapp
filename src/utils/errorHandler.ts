import { Request, Response, NextFunction } from 'express';
import logger from './logger';

// Custom error class to structure error responses
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Centralized error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  // Log the error
  logger.error(`[${statusCode}] ${message}`);

  // Respond with the error
  res.status(statusCode).json({ error: message });
};
