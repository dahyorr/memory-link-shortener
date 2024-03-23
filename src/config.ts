import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';

const isDev = process.env.NODE_ENV !== 'production';

export const runPreStartupConfig = () => {
  dotenv.config();
}

export const setupCoreMiddlewares = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(isDev ? "dev" : "common"));
}