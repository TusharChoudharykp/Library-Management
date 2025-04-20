import express from "express";
import {
  borrowBook,
  payFine,
  returnBook,
} from "../../controllers/borrowed-controller";
import {
  validateBorrowRequest,
  validateFinePayment,
  validateReturnRequest,
} from "../../middlewares/borrowed-middleware";

const router = express.Router();

router.post("/borrow", validateBorrowRequest, borrowBook);
router.put("/return/:id", validateReturnRequest, returnBook);
router.put("/pay/:id", validateFinePayment, payFine);

export default router;
