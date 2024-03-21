import { Express } from 'express';

const registerRoutes = (app: Express) => {
  app.get('/encode');
  app.get('/decode');
  app.get('/statistic/:url_path');
}

export default registerRoutes