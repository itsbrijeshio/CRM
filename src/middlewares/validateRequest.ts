import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import asyncHandler from "./asyncHandler";
import { Types } from "mongoose";
import { ApiError } from "../utils";

type SourceType = "body" | "params" | "query";

const validateRequest = (schema: ZodSchema, source: SourceType = "body") =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const values = req[source];
    await schema.parseAsync(values);
    next();
  });

const idValidator = (
  prop: string = "id",
  source: SourceType = "params",
  propType: string = ""
) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req[source][prop];
    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(400, `Invalid ${propType || prop} ID.`);
    }
    next();
  });

validateRequest.id = idValidator;

export default validateRequest;
