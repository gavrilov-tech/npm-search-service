import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

import { HTTP_CODES, HTTP_STATUS_TEXT } from '../constants';
import { AppError, Repository } from '../models';

export async function repositories (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const url: string = 'https://registry.npmjs.org/-/v1/search';
    const query: string = req.query?.['text'] as string;

    if (!query) {
      throw new AppError(
        HTTP_CODES.BAD_REQUEST,
        HTTP_STATUS_TEXT[HTTP_CODES.BAD_REQUEST],
      );
    }

    const { data } = await axios.get(url, {
      params: {
        text: query
      }
    });

    const repositories: Repository[] = data.objects.map((object: any) => new Repository(object));

    res.status(HTTP_CODES.OK).json(repositories);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      next(new AppError(
        error.response.status,
        error.response.statusText,
        error?.message
      ));
    } else {
      next(error);
    }
  }
}