import mongoose, { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;