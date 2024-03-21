import { runPreStartupConfig, setupCoreMiddlewares } from 'config';
import express from 'express';

runPreStartupConfig();
const app = express();
setupCoreMiddlewares(app);

app.get('/', (request, response) => {
    response.status(200).send('All Good!');
});

app.listen(5000);
