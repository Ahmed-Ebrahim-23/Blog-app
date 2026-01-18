import type { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';
import JSend from '../utils/jsend.js';

export const globalErrorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let payload: object = {};
    let message: string = 'An unexpected error occurred';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        payload = err.data;
        message = err.message;
    }

    if(statusCode >= 400 && statusCode < 500){
        return JSend.fail(res, payload, statusCode);
    }

    console.error('Unexpected Error:', err);
    if (process.env.NODE_ENV === 'development') {
        payload = { 
            name: err.name,
            message: err.message,
            stack: err.stack 
        };
    }
    return JSend.error(res, message, statusCode, payload);
    
};