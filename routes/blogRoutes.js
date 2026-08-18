import express from 'express'
import { addBlog, addComment, deletesBlogByID, generateContent, getAllBlogs, getBlogByID, getBlogComments, togglePublish, updatedBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog)
blogRouter.put("/:id", auth, upload.single("image"), updatedBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogByID);
blogRouter.post("/delete", auth, deletesBlogByID);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth,  generateContent);
export default blogRouter;