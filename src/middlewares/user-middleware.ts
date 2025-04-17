import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common";
import { AppError } from "../utils/errors/app-error";

// Middleware to validate user signup request
const validateSignup = (req: any, res: any, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    errorResponse.message = "Something went wrong while signing up user";
    errorResponse.error = new AppError(
      ["Missing required fields: name, email, or password"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
};

// Middleware to validate user login request
const validateLogin = (req: any, res: any, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    errorResponse.message = "Something went wrong while logging in user";
    errorResponse.error = new AppError(
      ["Missing required fields: email or password"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
};

export { validateSignup, validateLogin };
