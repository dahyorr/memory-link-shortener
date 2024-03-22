import { encodeUrlHandler } from 'controllers/index';
import { Express } from 'express';
import validateBody from 'middlewares/validateBody';
import { decodeIdSchema, encodeUrlSchema } from 'validations';

const registerRoutes = (app: Express) => {
  app.post('/encode', validateBody(encodeUrlSchema), encodeUrlHandler);
  app.post('/decode', validateBody(decodeIdSchema));
  app.get('/statistic/:url_path');
}

export default registerRoutes