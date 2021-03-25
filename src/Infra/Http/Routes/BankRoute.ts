import { Router } from 'express';
import { BankController } from '@infra/Controller/Bank/BankController';
import { celebrate, Joi, Segments } from 'celebrate';

const bankController = new BankController();
const bankRoute = Router();

bankRoute.get(
    '/bank/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    bankController.findById,
);

bankRoute.get('/banks', bankController.findAll);

bankRoute.post(
    '/bank',
    celebrate({
        [Segments.BODY]: {
            code: Joi.string().required(),
            name: Joi.string().required(),
        },
    }),
    bankController.create,
);

bankRoute.put(
    '/bank/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            code: Joi.string().required(),
            name: Joi.string().required(),
        },
    }),
    bankController.update,
);

bankRoute.delete(
    '/bank/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    bankController.remove,
);

export default bankRoute;
