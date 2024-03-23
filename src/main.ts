import { runPreStartupConfig, setupCoreMiddlewares } from './config';
import express from 'express';
import errorMiddleware from 'middlewares/errorHandler';
import registerRoutes from 'routes';

const PORT = 5000

runPreStartupConfig();
const app = express();
setupCoreMiddlewares(app);

registerRoutes(app)
// app.get('/', (request, response) => {
//     response.status(200).send('All Good!');
// });
app.listen(PORT);

console.log(`Server running on port ${PORT}`)


app.use(errorMiddleware);
