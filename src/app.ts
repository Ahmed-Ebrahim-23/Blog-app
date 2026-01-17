import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import dbConnection from './config/db.ts';

dotenv.config();

dbConnection();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});