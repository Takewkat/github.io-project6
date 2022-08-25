import mongoose, { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 4, maxlength: 64, 
    match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ },
  password: { type: String, required: true, minlength: 4, maxlength: 32, 
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/ },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;