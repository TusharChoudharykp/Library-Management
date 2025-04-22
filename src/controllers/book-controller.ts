import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../utils/common/success-response";
import { errorResponse } from "../utils/common/error-response";
import BookService from "../services/book-service"; // Adjust the path if needed

const bookService = new BookService();

const createBook = async (req: any, res: any) => {
  try {
    const book = await bookService.create(req.body);

    successResponse.message = "Successfully created the book";
    successResponse.data = book;

    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error: any) {
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const getBook = async (req: any, res: any) => {
  try {
    const book = await bookService.get(Number(req.params.id));

    if (!book) {
      errorResponse.message = "Book not found";
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    }

    successResponse.message = "Successfully fetched the book";
    successResponse.data = book;

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error: any) {
    errorResponse.message = "Error while fetching the book";
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const getAllBooks = async (_req: any, res: any) => {
  try {
    const books = await bookService.getAll();

    successResponse.message = "Successfully fetched all books";
    successResponse.data = books;

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error: any) {
    errorResponse.message = "Error while fetching books";
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const updateBook = async (req: any, res: any) => {
  try {
    const updated = await bookService.update(Number(req.params.id), req.body);

    if (!updated) {
      errorResponse.message = "Book not found";
      errorResponse.error = {};
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    }

    successResponse.message = "Successfully updated the book";
    successResponse.data = updated;

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error: any) {
    errorResponse.message = "Error while updating the book";
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const deleteBook = async (req: any, res: any) => {
  try {
    const deleted = await bookService.delete(Number(req.params.id));

    if (!deleted) {
      errorResponse.message = "Book not found";
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    }

    successResponse.message = "Successfully deleted the book";
    successResponse.data = deleted;

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error: any) {
    errorResponse.message = "Error while deleting the book";
    errorResponse.error = error;

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

export { createBook, getBook, getAllBooks, updateBook, deleteBook };
