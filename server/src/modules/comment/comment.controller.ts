import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { commentService } from "./comment.service";

/* ---------------- ADD COMMENT ---------------- */
const addComment = async (req: Request, res: Response) => {
  try {
    const result = await commentService.addComment(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Comment added successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- GET COMMENTS BY BLOG ---------------- */
const getBlogComments = async (req: Request, res: Response) => {
  try {
    const { blog_id } = req.params;

    const result = await commentService.getBlogComments(blog_id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Comments fetched successfully",
      data: result, // ✅ now array will come
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};



/* ---------------- GET ALL COMMENTS (ADMIN) ---------------- */
const getAllComments = async (req: Request, res: Response) => {
  try {
    const result = await commentService.getAllComments();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All comments fetched",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- DELETE COMMENT ---------------- */
const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await commentService.deleteComment(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Comment deleted",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- APPROVE COMMENT ---------------- */
const approveComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await commentService.approveComment(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Comment approved",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
};

export const commentController = {
  addComment,
  getBlogComments,
  getAllComments,
  deleteComment,
  approveComment,
};