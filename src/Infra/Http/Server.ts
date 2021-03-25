import 'dotenv/config';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import '@shared/Container';

import { AppError } from '@shared/Errors/AppError';
const PORT = process.env.PORT || 3003;
const app = express();

import '@infra/Typeorm';

import routes from './Routes';

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.status).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

//app.set('domain', '192.168.0.57');

app.listen(PORT, () => console.log(`SERVER RUNING IN PORT ${PORT}`));
