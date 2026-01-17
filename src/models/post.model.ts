import { Document, Schema, model } from 'mongoose';
import type { IUser } from './user.model.js';

export interface IPost extends Document {
    title: string;
    content: string;
    author: IUser;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        content: {
            type: String,
             required: true
        },
        author: {
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
    },
    {timestamps: true}
);

export const Post = model<IPost>('Post', PostSchema);