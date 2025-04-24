import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BorrowedService from "../services/borrowed-service";
import { successResponse } from "../utils/common/success-response";
import { errorResponse } from "../utils/common/error-response";

const borrowedService = new BorrowedService();

const borrowBook = async (req: any, res: any) => {
  try {
    const result = await borrowedService.borrowBook(req.body);

    successResponse.message = "Book borrowed successfully";
    successResponse.data = result;

    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error: any) {
    errorResponse.message = "Error while borrowing book";
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const returnBook = async (req: any, res: any) => {
  try {
    const result = await borrowedService.returnBook(
      Number(req.params.id),
      req.body.actualReturnDate
    );

    if (!result) {
      errorResponse.message = "Borrowed record not found";
      errorResponse.error = {};
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    }

    successResponse.message = "Book returned successfully";
    successResponse.data = result;

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error: any) {
    errorResponse.message = "Error while returning book";
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const payFine = async (req: any, res: any) => {
  try {
    const result = await borrowedService.payFine(
      Number(req.params.id),
      req.body.amountPaid
    );

    if (!result) {
      errorResponse.message = "Borrowed record not found";
      errorResponse.error = {};
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    }

    if (result.error) {
      errorResponse.message = result.message;
      errorResponse.data = {
        fine: result.fine,
        dueAmount: result.dueAmount,
        paidAmount: result.paidAmount,
      };
      errorResponse.error = {};
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    successResponse.message = result.message;
    successResponse.data = {
      paidAmount: result.paidAmount,
      dueAmount: result.dueAmount,
    };

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error: any) {
    errorResponse.message = "Error while processing fine payment";
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

export { borrowBook, returnBook, payFine };
//add more functionalities like get all the current borrowed book and all the past borrowed books or get all due amount of users
