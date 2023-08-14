import winston from 'winston';

// Define log formats
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Set the log level here (options: error, warn, info, verbose, debug, silly)
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    // Console transport (log to console)
    new winston.transports.Console(),
    // File transport (log to file)
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;
