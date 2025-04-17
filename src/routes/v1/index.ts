// routes/v1/index.ts
import express from "express";
import InfoController from "../../controllers/info-controller";
import bookRoutes from "./book-routes";
import userRoutes from "./user-routes";
import borrowedRoutes from "./borrowed-routes";

const router = express.Router();

router.get("/info", InfoController.info);
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/borrowed", borrowedRoutes);

export default router;
