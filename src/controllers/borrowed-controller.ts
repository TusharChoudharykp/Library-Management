import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BorrowedService from "../services/borrowed-service";
import { successResponse } from "../utils/common/success-response";
import { errorResponse } from "../utils/common/error-response";

const borrowedService = new BorrowedService();

async function borrowBook(req: any, res: any) {
  try {
    const result = await borrowedService.borrowBook(req.body);
    return res.status(StatusCodes.CREATED).json({
      ...successResponse,
      message: "Book borrowed successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: error.message,
    });
  }
}

async function returnBook(req: any, res: any) {
  try {
    const result = await borrowedService.returnBook(
      Number(req.params.id),
      req.body.actualReturnDate
    );

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        ...errorResponse,
        message: "Borrowed record not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      ...successResponse,
      message: "Book returned successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: error.message,
    });
  }
}

async function payFine(req: any, res: any) {
  try {
    const result = await borrowedService.payFine(
      Number(req.params.id),
      req.body.amountPaid
    );

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({
        ...errorResponse,
        message: "Borrowed record not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      ...successResponse,
      message: "Fine payment updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: error.message,
    });
  }
}

export { borrowBook, returnBook, payFine };
