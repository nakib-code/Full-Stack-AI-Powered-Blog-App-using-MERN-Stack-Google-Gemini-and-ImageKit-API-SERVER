import type { Request, Response } from "express";
import fs from "fs";
import imagekit from "../../db/imageKit";
import { blogService } from "./blog.service";

const createBlog = async (req: any, res: any) => {
  try {
    const {
      title,
      subtitle,
      description,
      category,
      isPublished,
    } = req.body;

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message:
          "title, description, category and image are required",
      });
    }

    // Read uploaded file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: `${Date.now()}-${imageFile.originalname}`,
      folder: "/blogs",
    });

    // Generate optimized URL
    const imageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // Save to database
    const result = await blogService.createBlog({
      title,
      subtitle,
      description,
      category,
      image: imageUrl,
      isPublished: isPublished === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const result = await blogService.getAllBlogs();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getSingleBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await blogService.getBlogById (id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const updateBlog = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const result = await blogService.updateBlog(
      id,
      req.body
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await blogService.deleteBlog(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const togglePublish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await blogService.togglePublish(id);

    return res.status(200).json({
      success: true,
      message: "Blog publish status updated",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  togglePublish,
};