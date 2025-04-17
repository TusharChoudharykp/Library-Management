import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../../controllers/book-controller";
import { validateCreateBook } from "../../middlewares/book-middleware";

const router = express.Router();

router.post("/", validateCreateBook, createBook);
router.get("/:id", getBook);
router.get("/", getAllBooks);
router.put("/:id", validateCreateBook, updateBook);
router.delete("/:id", deleteBook);

export default router;
