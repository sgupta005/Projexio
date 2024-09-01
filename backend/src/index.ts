import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb';
import globalErrorHandler from './middlewares/globalErrorHandler';
import logger from './middlewares/logger';
import appRouter from './routes/auth.route';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173', // Specify the allowed origin
    credentials: true,
  })
);

app.use(logger);

app.use('/api/auth', appRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
