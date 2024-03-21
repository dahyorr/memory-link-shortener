import { runPreStartupConfig, setupCoreMiddlewares } from './config';
import express from 'express';
import errorMiddleware from 'middlewares/errorHandler';
import registerRoutes from 'routes';

runPreStartupConfig();
const app = express();
setupCoreMiddlewares(app);

registerRoutes(app)
// app.get('/', (request, response) => {
//     response.status(200).send('All Good!');
// });

app.listen(5000);


app.use(errorMiddleware);
