import config from 'config';
import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = config.get<string>('MONGO_URI');

export default function connectDB() {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions);
  console.log('Connected to MongoDB');
}