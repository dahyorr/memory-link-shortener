import { encodeUrlHandler, decodeUrlHandler, linkStatisticHandler } from 'controllers/index';
import { Express } from 'express';
import validateBody from 'middlewares/validateBody';
import { urlInputSchema, } from 'validations';

const registerRoutes = (app: Express) => {
  app.post('/encode', validateBody(urlInputSchema), encodeUrlHandler);
  app.post('/decode', validateBody(urlInputSchema), decodeUrlHandler);
  app.get('/statistic/:id', linkStatisticHandler);
}

export default registerRoutes