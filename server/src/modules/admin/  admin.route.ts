import { Router } from "express";
import { adminController } from "./  admin.controller";

const router = Router();

/* ---------------- DASHBOARD ---------------- */
router.get("/dashboard", adminController.getDashboard);

/* ---------------- BLOG ROUTES ---------------- */
router.patch("/blogs/:id/approve", adminController.approveBlogById);
router.delete("/blogs/:id", adminController.deleteBlogById);

/* ---------------- COMMENT ROUTES ---------------- */
router.patch("/comments/:id/approve", adminController.approveCommentById);
router.delete("/comments/:id", adminController.deleteCommentById);

export const adminRoutes = router;