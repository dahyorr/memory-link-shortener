import express from 'express';
import { setupCoreMiddlewares } from './config';
import registerRoutes from 'routes';
import errorMiddleware from 'middlewares/errorHandler';

const app = express();
setupCoreMiddlewares(app);
registerRoutes(app)
app.use(errorMiddleware);

export default app;
