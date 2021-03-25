import { Router } from 'express';
// Middleware
import authentication from '../Middleware/authentication';
import { Authorization } from '../Middleware/authorization';
// Routes
import authRoute from './AuthRoutes';
import bankRoute from './BankRoute';
import passwordRoute from './PasswordRoutes';
import providerRoute from './ProviderRoutes';
import unitRoute from './UnitRoutes';
import userRoute from './UserRoutes';

const routes = Router();
const authorization = new Authorization();

routes.use('/auth', authRoute);
routes.use('/password', passwordRoute);
routes.use(unitRoute, authentication);
routes.use(authentication, authorization.admin, userRoute);
routes.use(authentication, bankRoute);
routes.use(authentication, providerRoute);

export default routes;
