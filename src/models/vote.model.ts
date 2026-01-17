import { Document, model, Schema } from "mongoose";

import type { IPost } from "./post.model.js";
import type { IUser } from "./user.model.js";
import type { IComment } from "./comment.model.js";

export interface IVote extends Document {
    voter: IUser;
    targetID: IPost | IComment;
    targetType: "Post" | "Comment";
    value: number; // 1 for upvote, -1 for downvote
    createdAt: Date; 
    updatedAt: Date;
}

const VoteSchema: Schema = new Schema(
    {
        voter: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        targetID: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "targetType",
        },
        targetType: {
            type: String,
            required: true,
            enum: ["Post", "Comment"],
        },
        value: {
            type: Number,
            required: true,
            enum: [1, -1],
        },
    },
    { timestamps: true }
);

VoteSchema.index({ voter: 1, targetID: 1, targetType: 1 }, { unique: true });

export const Vote = model<IVote>("Vote", VoteSchema);