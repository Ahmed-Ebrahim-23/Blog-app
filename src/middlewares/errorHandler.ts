import type { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';
import JSend from '../utils/jsend.js';

export const globalErrorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let payload: Record<string, any> = {};
    let message: string = 'An unexpected error occurred';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        if (err.data) {
            payload = typeof err.data === 'object' ? err.data : { details: err.data };
        }
        message = err.message;
    }
    else 
        message = process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred';
    
    
    if(statusCode >= 400 && statusCode < 500){
        const responseData = {
            message,
            ...(Object.keys(payload).length > 0 && payload)
        };
        return JSend.fail(res, responseData, statusCode);
    }

    console.error('Unexpected Error:', {
        message: err.message,
        stack: err.stack,
        timestamp: new Date().toISOString()
    });
    return JSend.error(res, message, statusCode);
    
};