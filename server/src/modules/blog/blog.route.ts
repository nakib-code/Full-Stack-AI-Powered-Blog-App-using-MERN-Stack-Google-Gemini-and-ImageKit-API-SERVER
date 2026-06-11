import { Router } from "express";
import { BlogController } from "./blog.controller";
import upload from "../../middleware/multer";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../../constants/role";

const router = Router();

/* ---------------- CREATE BLOG (ADMIN ONLY) ---------------- */
router.post(
  "/create-blog",
  auth(USER_ROLE.ADMIN),
  upload.single("image"),
  BlogController.createBlog
);

/* ---------------- GET ALL BLOGS (USER + ADMIN) ---------------- */
router.get(
  "/all-blogs",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  BlogController.getAllBlogs
);

/* ---------------- GET SINGLE BLOG (USER + ADMIN) ---------------- */
router.get(
  "/:id",
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  BlogController.getSingleBlog
);

/* ---------------- UPDATE BLOG (ADMIN ONLY) ---------------- */
router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  BlogController.updateBlog
);

/* ---------------- DELETE BLOG (ADMIN ONLY) ---------------- */
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  BlogController.deleteBlog
);

export const BlogRoutes = router;