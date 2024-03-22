import { Request, Response } from 'express';
import { urlStore } from 'lib/URLStore';
import { HttpException } from 'lib/errors';
import { getURLLastPath } from 'utils';
import { urlInputSchema, } from 'validations';
import { z } from 'zod';

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

export const decodeUrlHandler = async (req: Request, res: Response) => {
  const { url } = req.body as z.infer<typeof urlInputSchema>;
  const id = getURLLastPath(new URL(url));
  let urlObj: URL;

  try {
    urlObj = urlStore.getURL(id);
  }
  catch (err) {
    if (err instanceof Error) {
      throw new HttpException(400, err.message)
    }
  }

  return res.json({
    status: 'success',
    data: {
      url: urlObj,
    },
  });
}

