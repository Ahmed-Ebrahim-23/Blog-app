import jwt from 'jsonwebtoken';
import UserService from './user.service.js';
import type { IUser } from '../models/user.model.js';
import AppError from '../utils/AppError.js';

class AuthService {
    private getJwtSecret(): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('FATAL ERROR: JWT_SECRET is missing from .env file');
        }
        return secret;
    }

    private getJwtExpiresIn(): number {
        const expiresIn = process.env.JWT_EXPIRES_IN;
        if (!expiresIn) {
            throw new Error('FATAL ERROR: JWT_EXPIRES_IN is missing from .env file');
        }
        return parseInt(expiresIn);
    }

    public generateToken(user: IUser): string {
        const payload = {
            email: user.email,
            username: user.username
        };
        return jwt.sign(payload, this.getJwtSecret(), { 
            expiresIn: this.getJwtExpiresIn() 
        });
    }

    public async login(email: string, password: string): Promise<{ user: any; token: string }> {
        const user = await UserService.getUserByEmail(email);
        
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        const isPasswordValid = await UserService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = this.generateToken(user);

        const userData = {
            name: user.name,
            username: user.username,
            email: user.email
        };

        return { user: userData, token };
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.getJwtSecret());
        } catch (error) {
            throw new AppError('Invalid token', 401);
        }
    }
}

export default new AuthService();