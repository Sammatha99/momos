import { RequestHandler } from "express";
import { z } from "zod";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export const validate = <
  Params = Record<string, any>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Record<string, any>
>(schema: {
  body?: z.ZodSchema;
  query?: z.ZodSchema;
  params?: z.ZodSchema;
}): RequestHandler<Params, ResBody, ReqBody, ReqQuery> => {
  return async (req, res, next) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }

      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }

      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          code: err.code,
        }));

        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          error: getReasonPhrase(StatusCodes.BAD_REQUEST),
          details: formattedErrors,
        } as ResBody);
        return;
      }

      next(error);
    }
  };
};
