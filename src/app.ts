import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import itemRouter from './router/itemRouter';
import userRouter from './router/userRouter'

const app = express();
 
app.use(morgan('tiny'));
 
app.use(cors());
 
app.use(helmet());
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/item/', itemRouter);

app.use('/user/', userRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})


 
export default app;

