import { Request, Response } from "express";
import { storageService } from "../services/storage.service";
import { fileService } from "../services/file.service";

class FileController {
  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const data = await fileService.processFile(req);
      storageService.addData(data);

      res.status(200).json({ message: "The file was uploaded successfully." });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error uploading file: ", error.message);
        res.status(500).json({ message: error.message });
      } else {
        console.error("Unknown error uploading file");
        res.status(500).json({ message: "Unknown error uploading file" });
      }
    }
  }
}

export const fileController = new FileController();
