import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../../constants/role";

const router = Router();

/* ---------------- PUBLIC ---------------- */
router.post("/add", commentController.addComment);
router.get("/blog/:blogId", commentController.getBlogComments);

/* ---------------- ADMIN ---------------- */
router.get(
  "/all",
  auth(USER_ROLE.ADMIN),
  commentController.getAllComments
);

router.patch(
  "/approve/:id",
  auth(USER_ROLE.ADMIN),
  commentController.approveComment
);

router.delete(
  "/delete/:id",
  auth(USER_ROLE.ADMIN),
  commentController.deleteComment
);

export const commentRoutes = router;