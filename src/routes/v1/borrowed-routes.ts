import express from "express";
import { borrowBook, returnBook } from "../../controllers/borrowed-controller";
import {
  validateBorrowRequest,
  validateReturnRequest,
} from "../../middlewares/borrowed-middleware";

const router = express.Router();

router.post("/borrow", validateBorrowRequest, borrowBook);
router.put("/return/:id", validateReturnRequest, returnBook); //

export default router;
