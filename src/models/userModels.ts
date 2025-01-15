import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

