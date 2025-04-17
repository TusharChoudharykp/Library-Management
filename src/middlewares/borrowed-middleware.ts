import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common";
import { AppError } from "../utils/errors/app-error";

export function validateBorrowRequest(req: any, res: any, next: NextFunction) {
  const { userId, bookId, borrowDate, returnDate } = req.body;

  if (!userId || !bookId || !borrowDate || !returnDate) {
    errorResponse.message = "Invalid borrow request";
    errorResponse.error = new AppError(
      ["Missing required fields"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
}

export function validateReturnRequest(req: any, res: any, next: NextFunction) {
  const { actualReturnDate } = req.body;

  if (!actualReturnDate) {
    errorResponse.message = "Invalid return request";
    errorResponse.error = new AppError(
      ["Missing actualReturnDate"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
}
