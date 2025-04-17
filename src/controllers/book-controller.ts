import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BookService from "../services/book-service";
import { successResponse } from "../utils/common/success-response";
import { errorResponse } from "../utils/common/error-response";

const bookService = new BookService();

const createBook = async (req: any, res: any) => {
  try {
    const book = await bookService.create(req.body);

    return res.status(StatusCodes.CREATED).json({
      ...successResponse,
      message: "Successfully created the book",
      data: book,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: error.message || "Something went wrong",
    });
  }
};

const getBook = async (req: any, res: any) => {
  try {
    const book = await bookService.get(Number(req.params.id));
    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({
        ...errorResponse,
        message: "Book not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      ...successResponse,
      message: "Successfully fetched the book",
      data: book,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: "Error while fetching the book",
      error: error.message,
    });
  }
};

const getAllBooks = async (_req: any, res: any) => {
  try {
    const books = await bookService.getAll();

    return res.status(StatusCodes.OK).json({
      ...successResponse,
      message: "Successfully fetched all books",
      data: books,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: "Error while fetching books",
      error: error.message,
    });
  }
};

const updateBook = async (req: any, res: any) => {
  try {
    const updated = await bookService.update(Number(req.params.id), req.body);
    if (!updated) {
      return res.status(StatusCodes.NOT_FOUND).json({
        ...errorResponse,
        message: "Book not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      ...successResponse,
      message: "Successfully updated the book",
      data: updated,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: "Error while updating the book",
      error: error.message,
    });
  }
};

const deleteBook = async (req: any, res: any) => {
  try {
    const deleted = await bookService.delete(Number(req.params.id));
    if (!deleted) {
      return res.status(StatusCodes.NOT_FOUND).json({
        ...errorResponse,
        message: "Book not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      ...successResponse,
      message: "Successfully deleted the book",
      data: deleted,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: "Error while deleting the book",
      error: error.message,
    });
  }
};

export { createBook, getBook, getAllBooks, updateBook, deleteBook };
