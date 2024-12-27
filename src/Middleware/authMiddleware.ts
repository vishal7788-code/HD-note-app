import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend JwtPayload to include userId
interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "Unauthorized, please login.",
      });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as CustomJwtPayload;

    if (!decodedToken || !decodedToken.userId) {
      res.status(401).json({
        message: "Invalid Token",
      });
      return;
    }
    
    req.id = decodedToken.userId;
    next();
  } catch (error) {
    console.error("Error occurred in isAuthenticated middleware:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default authMiddleware;
