import {Document, model, Schema} from 'mongoose';
import type {IPost} from './post.model.js';
import type {IUser} from './user.model.js';

export interface IComment extends Document {
    content: string;
    author: IUser;
    post: IPost;
    createdAt: Date;
    updatedAt: Date;
}
