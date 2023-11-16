import { NextFunction, Request, Response, Router } from "express";
import { CheckForCache, PaginateResults } from "../middleware";

export const PictureRouter = Router();

const PicturesMap = new Map();
PictureRouter.get("/:category", CheckForCache(PicturesMap), PaginateResults);
