require('dotenv').config()

export default {
  PORT: 3000,
  MONGO_URI : process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
};

