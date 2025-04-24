import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/common";
import { AppError } from "../utils/errors/app-error";

function validateBorrowRequest(req: any, res: any, next: NextFunction) {
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

function validateReturnRequest(req: any, res: any, next: NextFunction) {
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

function validateFinePayment(req: any, res: any, next: NextFunction) {
  const { amountPaid } = req.body;

  if (!amountPaid || isNaN(amountPaid) || amountPaid <= 0) {
    errorResponse.message = "Invalid payment request";
    errorResponse.error = new AppError(
      ["Amount to pay is required and should be positive"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
}

export { validateBorrowRequest, validateReturnRequest, validateFinePayment };
