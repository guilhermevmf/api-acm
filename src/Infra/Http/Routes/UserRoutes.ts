import { Router } from 'express';
import { UserController } from '@infra/Controller/User/UserController';
import { celebrate, Joi, Segments } from 'celebrate';

const userContoller = new UserController();
const userRoute = Router();

userRoute.get(
    '/user/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    userContoller.findById,
);

userRoute.get('/users', userContoller.findAll);

userRoute.post(
    '/user',
    celebrate({
        [Segments.BODY]: {
            departmentId: Joi.string().uuid(),
            cod: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            role: Joi.string().required(),
            active: Joi.bool().required().default(true),
        },
    }),
    userContoller.create,
);

userRoute.put(
    '/user/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            departmentId: Joi.string().uuid(),
            cod: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            role: Joi.string().required(),
            active: Joi.bool().required().default(true),
        },
    }),
    userContoller.update,
);

userRoute.delete(
    '/user/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    userContoller.remove,
);

export default userRoute;
