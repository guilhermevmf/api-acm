import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { PasswordController } from '@infra/Controller/Auth/PasswordController';

const passwordController = new PasswordController();
const passwordRoute = Router();

passwordRoute.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    passwordController.create,
);

export default passwordRoute;
