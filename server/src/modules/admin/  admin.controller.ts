import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { adminService } from "./  admin.service";

/* ---------------- DASHBOARD ---------------- */
const getDashboard = async (req: Request, res: Response) => {
  const result = await adminService.getDashboard();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard data fetched",
    data: result,
  });
};

/* ---------------- BLOG ACTIONS ---------------- */

// Approve Blog
const approveBlogById = async (req: Request, res: Response) => {
  const result = await adminService.approveBlogById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog approved successfully",
    data: result,
  });
};

// Delete Blog
const deleteBlogById = async (req: Request, res: Response) => {
  const result = await adminService.deleteBlogById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
};

/* ---------------- COMMENT ACTIONS ---------------- */

// Approve Comment
const approveCommentById = async (req: Request, res: Response) => {
  const result = await adminService.approveCommentById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment approved successfully",
    data: result,
  });
};

// Delete Comment
const deleteCommentById = async (req: Request, res: Response) => {
  const result = await adminService.deleteCommentById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment deleted successfully",
    data: result,
  });
};

/* ---------------- EXPORT ---------------- */

export const adminController = {
  getDashboard,
  approveBlogById,
  deleteBlogById,
  approveCommentById,
  deleteCommentById,
};