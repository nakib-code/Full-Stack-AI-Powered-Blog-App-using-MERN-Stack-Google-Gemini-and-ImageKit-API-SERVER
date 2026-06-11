import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { authSevice } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authSevice.signupIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
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

const login = async (req: Request, res: Response) => {
  try {
    const result = await authSevice.loginUser(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signup,
  login,
};