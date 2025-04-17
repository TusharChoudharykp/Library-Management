import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const validateCreateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Missing required fields: title, author, or publishedYear",
      data: {},
      error: {},
    });
    return; // explicitly return void
  }

  next(); // proceed to controller
};
