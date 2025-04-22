import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common/error-response";
import { AppError } from "../utils/errors/app-error";

const validateCreateBook = (req: any, res: any, next: NextFunction) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    errorResponse.message = "Something went wrong while creating the book";
    errorResponse.error = new AppError(
      ["Missing required fields: title, author, or publishedYear"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
};

export { validateCreateBook };
