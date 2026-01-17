import {Document, model, Schema} from 'mongoose';
import type {IPost} from './post.model.ts';
import type {IUser} from './user.model.ts';

export interface IComment extends Document {
    content: string;
    author: IUser;
    post: IPost;
    createdAt: Date;
    updatedAt: Date;
}
