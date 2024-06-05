import { Router, Request, Response, NextFunction } from "express";
import upload from "../config/multer.config";
import { fileController } from "../controllers/file.controller";
import asyncHandler from "../utils/asyncHandler";

const fileRoutes = Router();

interface CustomRequest extends Request {
  file?: Express.Multer.File;
}

const validateFileUpload = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(500).json({ message: "No file uploaded" });
  }
  next();
};

fileRoutes.post(
  "/",
  upload.single("file"),
  validateFileUpload,
  asyncHandler(fileController.uploadFile)
);

export default fileRoutes;
