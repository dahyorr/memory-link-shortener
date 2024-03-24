import { runPreStartupConfig, setupCoreMiddlewares } from './config';
import errorMiddleware from 'middlewares/errorHandler';
import registerRoutes from 'routes';
import express from 'express';

const PORT = 5000

runPreStartupConfig();

const app = express();

setupCoreMiddlewares(app);

registerRoutes(app)

app.listen(PORT);

console.log(`Server running on port ${PORT}`)


app.use(errorMiddleware);
export default app;