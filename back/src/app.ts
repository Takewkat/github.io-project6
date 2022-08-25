import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import router from './routes/router';
import corsMiddleware from './middleware/cors.middleware';
import errorMiddleware from './middleware/error.middleware';
import connectDB from './services/connectDB.service';

const PORT = config.get<number>('PORT');

const app = express();
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => 
      console.log(`Server started on port ${PORT}`)
    );
  } catch (err) {
    console.log(err, 'DB connection error');
  }
}

start();