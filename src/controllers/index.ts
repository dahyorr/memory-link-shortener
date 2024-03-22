import { Request, Response } from 'express';
import { urlStore } from 'lib/URLStore';
import { encodeUrlSchema } from 'validations';
import { z } from 'zod';

export const encodeUrlHandler = async (req: Request, res: Response) => {
  const { url } = req.body as z.infer<typeof encodeUrlSchema>;
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