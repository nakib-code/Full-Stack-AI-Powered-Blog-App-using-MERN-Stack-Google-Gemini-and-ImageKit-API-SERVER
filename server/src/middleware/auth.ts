import jwt from "jsonwebtoken";
import config from "../config";

export const auth = (...roles: string[]) => {
  return async (req: any, res: any, next: any) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token,
        config.secret!
      ) as any;

      req.user = decoded;

      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
};