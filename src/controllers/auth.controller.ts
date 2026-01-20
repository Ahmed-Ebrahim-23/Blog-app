import type { NextFunction, Request, Response } from 'express';
import JSend  from '../utils/jsend.js';
import AppError from '../utils/AppError.js';
import UserService from '../services/user.service.js';
import AuthService from '../services/auth.service.js';
import type { IUser } from '../models/user.model.js';

class AuthController {  

    public register = async (req: Request, res: Response) => {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            throw new AppError('All fields are required', 400);
        }

        const user = await UserService.createUser(name, username, password, email);
        if (!user) {
            throw new AppError('User registration failed', 500);
        }

        return JSend.success(res, { user }, 201);
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
 
        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }

        const result = await AuthService.login(email, password);

        return JSend.success(res, result, 200);
    }

}

export default new AuthController();