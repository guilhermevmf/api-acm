import { ProviderController } from '@infra/Controller/Provider/ProviderController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const providerRoute = Router();
const providerController = new ProviderController();

providerRoute.get(
    '/provider/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    providerController.findById,
);

providerRoute.get(
    '/provider/department/:departmentId',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    providerController.findAll,
);

providerRoute.post(
    '/provider/department',
    celebrate({
        [Segments.PARAMS]: {
            departmentId: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            document: Joi.string().required(),
            bankId: Joi.string().uuid().required(),
            agency: Joi.string().required(),
            typeAccount: Joi.string().required(),
            account: Joi.string().required(),
            digit: Joi.string().required(),
        },
    }),
    providerController.findAll,
);

providerRoute.put(
    '/provider/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
            document: Joi.string().required(),
            bankId: Joi.string().uuid().required(),
            agency: Joi.string().required(),
            typeAccount: Joi.string().required(),
            account: Joi.string().required(),
            digit: Joi.string().required(),
        },
    }),
    providerController.update,
);

providerRoute.delete(
    '/provider/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    providerController.remove,
);

export default providerRoute;
