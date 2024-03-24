import dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';

const isDev = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

export const runPreStartupConfig = () => {
  dotenv.config();
}

export const setupCoreMiddlewares = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (!isTest) {
    app.use(morgan(isDev ? "dev" : "common"));
  }
}