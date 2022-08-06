import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from "mongoose";
import router from './routes/router';
import corsMiddleware from './middleware/cors.middleware';

const PORT = config.get<number>('PORT');
const MONGO_URI = config.get<string>('MONGO_URI');

const app = express();
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => 
      console.log(`Server started on port ${PORT}`)
    );
  } catch (err) {
    console.log(err, 'MongoDB connection error');
  }
}

start();