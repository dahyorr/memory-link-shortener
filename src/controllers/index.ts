import { NextFunction, Request, Response } from 'express';
import { urlStore } from 'models/URLStore';
import { BadRequestException, NotFoundException } from 'lib/errors';
import { urlVisits } from 'models/URLVisits';
import { URLStats } from 'typings';
import { getURLLastPath } from 'utils';
import { urlInputSchema, } from 'validations';
import { z } from 'zod';


export const defaultRedirectHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  let urlObj: URL;
  try {
    urlObj = urlStore.getURL(id);
  }
  catch (err) {
    if (err instanceof Error) {
      return next(new NotFoundException(err.message))
    }
  }
  urlVisits.logVisit(id, req)
  res.redirect(urlObj.toString())
}

export const encodeUrlHandler = async (req: Request, res: Response) => {
  const { url } = req.body as z.infer<typeof urlInputSchema>;
  const urlObj = new URL(url);
  const id = urlStore.saveURL(urlObj);
  const shortURL = `${req.protocol}://${req.get('host')}/${id}`;
  return res.json({
    status: 'success',
    data: {
      shortURL,
    },
  });
}

export const decodeUrlHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body as z.infer<typeof urlInputSchema>;
  const id = getURLLastPath(new URL(url));
  let urlObj: URL;

  try {
    urlObj = urlStore.getURL(id);
  }
  catch (err) {
    if (err instanceof Error) {
      return next(new BadRequestException(err.message))
    }
  }
  urlVisits.logVisit(id, req)
  return res.json({
    status: 'success',
    data: {
      url: urlObj,
    },
  });
}

export const linkStatisticHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  let stats: URLStats;

  try {
    stats = urlStore.getStats(id);
  }
  catch (err) {
    if (err instanceof Error) {
      return next(new NotFoundException(err.message))
    }
  }
  return res.json({
    status: 'success',
    data: {
      ...stats,
      visits: urlVisits.getVisitsByURLId(id),
    },
  });
}