import {Document, Schema, model} from 'mongoose';

export interface IUser extends Document {
    name: String;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String, 
            required: true
        },
        username: {
            type: String, 
            required: true, 
            unique: true},
        email: {
            type: String, 
            required: true, 
            unique: true},
        password: {
            type: String, 
            required: true
        },
    },
    {timestamps: true}
);

export const User = model<IUser>('User', UserSchema);