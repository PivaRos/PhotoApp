import { NextFunction, Request, Response } from "express";
import { Network } from "./utilities";
import { hit } from "./interfaces";

export const PaginateResults = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //making sure to not change the original hits object
  const model: Array<hit> = [...res.locals.hits];

  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  interface results {
    result?: Array<any>;
    next?: {
      page: number;
      limit: number;
    };
    previous?: {
      page: number;
      limit: number;
    };
  }

  const results: results = {};

  if (endIndex < model.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.result = model.slice(startIndex, endIndex);
  return res.json(results);
};

export const CheckForCache = (CacheMap: Map<string, Array<hit>>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (CacheMap.has(req.params.category)) {
      //if this category was fetched already it will return the cached values
      res.locals.hits = CacheMap.get(req.params.category);
    } else {
      //if there is no cached values for this category it will make request for new values
      const hits = await Network.getPhotos(req.params.category);
      //if the request for new value had faild it will return internal server error
      if (!hits) return res.sendStatus(500);
      //else it will set new cache and get through to the next middleware
      CacheMap.set(req.params.category, hits);
      res.locals.hits = hits;
    }
    next();
  };
};
