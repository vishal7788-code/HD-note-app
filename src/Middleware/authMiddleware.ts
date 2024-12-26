import { NextFunction, Request, Response } from "express";
import jwt ,{JwtPayload}from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        id?: string;
      }
    }
  }

const authMiddleware = (req:Request, res:Response, next:NextFunction): void => {
    try{
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            message:"Unauthorized, please login.",
        });
        return;
    };
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string)as JwtPayload;
    if(!decodedToken){
        res.status(401).json({
            message:"Invalid Token"
        });
    };
    req.id=decodedToken.userId;
    next();
} 
catch (error) {
    console.error("error occured in isAuthenticated middleware");
};
}
export default authMiddleware;