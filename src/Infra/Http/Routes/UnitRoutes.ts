import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { UnitController } from '@infra/Controller/Unit/UnitController';

const unitController = new UnitController();
const unitRoute = Router();

unitRoute.get(
    '/unit/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    unitController.findById,
);

unitRoute.get('/units', unitController.findAll);

unitRoute.post(
    '/unit',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cnpj: Joi.string(),
            active: Joi.bool().required(),
        },
    }),
    unitController.create,
);

unitRoute.put(
    '/unit/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            cnpj: Joi.string(),
            active: Joi.bool().required(),
        },
    }),
    unitController.update,
);

unitRoute.delete(
    '/unit/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    unitController.remove,
);

export default unitRoute;
