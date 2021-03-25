import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { AuthenticationController } from '@infra/Controller/Auth/AuthController';

const authRoute = Router();
const authController = new AuthenticationController();

authRoute.get('/session/refresh', authController.refreshToken);

authRoute.post(
    '/session',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    authController.create,
);

export default authRoute;
