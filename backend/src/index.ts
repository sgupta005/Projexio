import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb';
import globalErrorHandler from './middlewares/globalErrorHandler';
import logger from './middlewares/logger';
import authRouter from './routes/auth.route';
import organisationRouter from './routes/organisation.router';
import projectRouter from './routes/project.router';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.static('public'));

app.use(logger);

app.use('/api/auth', authRouter);
app.use('/api/organisation', organisationRouter);
app.use('/api/organisation/:orgId/project', projectRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
