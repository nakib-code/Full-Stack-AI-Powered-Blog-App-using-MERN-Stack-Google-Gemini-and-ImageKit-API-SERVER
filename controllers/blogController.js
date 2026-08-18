import fs from "fs";
import imagekit from "../config/imageKit.js";
import Blog from "../models/Blog.js"; // ✅ Missing import
import Comment from "../models/comment.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    // Handle blog data
    let blogData = req.body.blog;
    if (typeof blogData === "string") {
      blogData = JSON.parse(blogData);
    }

    const { title, subtitle, description, category, isPublished } = blogData;
    const imageFile = req.file;

    // Check required fields
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Read image
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: Date.now() + "-" + imageFile.originalname,
      folder: "/blogs",
    });

    // Optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [{ quality: "auto" }, { format: "webp" }, { width: "1280" }],
    });

    // Save blog
    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const updatedBlog = async (req, res) => {
  try {
    const { id } = req.params;

    let blogData = req.body.blog;

    if (!blogData) {
      return res.json({
        success: false,
        message: "Blog data is required",
      });
    }

    if (typeof blogData === "string") {
      blogData = JSON.parse(blogData);
    }

    const {
      title,
      subtitle,
      description,
      category,
      isPublished,
    } = blogData;

    if (!title || !description || !category) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    let imageUrl = existingBlog.image;

    // New image uploaded
    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);

      const response = await imagekit.upload({
        file: fileBuffer,
        fileName:
          Date.now() + "-" + req.file.originalname,
        folder: "/blogs",
      });

      imageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        category,
        isPublished: Boolean(isPublished),
        image: imageUrl,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });

  } catch (error) {
    console.error("Update Blog Error:", error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
    res.json({ success: true, blogs })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getBlogByID = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId)
    if (!blog) {
      return res.json({ success: false, message: 'Blog not found' })
    }
    res.json({ success: true, blog })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const deletesBlogByID = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id)

    // Delete all comments associated with the blog
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id)
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 })
    res.json({ success: true, comments })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}