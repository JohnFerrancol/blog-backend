import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import createLocals from './middleware/locals.middleware.js';
import errorHandler from './middleware/errors.middleware.js';

import authRouter from './routes/auth.routes.js';

const app = express();

// Parse incoming POST request data to be converted into a useable JS object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(createLocals);

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

export default app;
