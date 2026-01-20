import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import dbConnection from './config/db.js';

import { globalErrorHandler } from './middlewares/errorHandler.js';

import authRouter from './routers/auth.route.js';

dotenv.config();

dbConnection();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});