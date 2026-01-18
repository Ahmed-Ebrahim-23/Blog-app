import type { Response } from 'express';

class JSend {
    public static success(res: Response, data: object | null, statusCode: number = 200): Response {
        return res.status(statusCode).json({
            status: 'success',
            data,
        });
    }

    public static fail(res: Response, data: object, statusCode: number = 400): Response {
        return res.status(statusCode).json({
            status: 'fail',
            data,
        });
    }

    public static error(res: Response, message: string, statusCode: number = 500, data?: object | null, code?: string | null): Response {
        const errorResponse: object = {
            status: 'error',
            message,
            ...(data && { data }),
            ...(code && { code })
        };

        return res.status(statusCode).json(errorResponse);
    }
}

export default JSend;