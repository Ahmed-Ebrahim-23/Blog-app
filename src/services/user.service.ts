import { User } from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

class UserService {
    public async createUser(name: string, username: string, password: string, email: string): Promise<any> {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({ name, username, password: hashedPassword, email });

        const user = {
            id: createdUser.id,
            name: createdUser.name,
            username: createdUser.username,
            email: createdUser.email
        };

        return user;
    }

    public async getUserByEmail(email: string): Promise<any> {
        const user = await User.findOne({ email });
        return user;
    }

    public async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}

export default new UserService();