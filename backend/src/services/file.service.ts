import { Request } from "express";
import fs from "fs";
import csvParser from "csv-parser";
import { DataRow } from "./storage.service";

export class FileService {
  async processFile(req: Request): Promise<DataRow[]> {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const filePath = req.file.path;

    try {
      const data = await this.parseCSV(filePath);
      this.cleanupFile(filePath);
      return data;
    } catch (error) {
      console.error("Error processing file:", error);
      throw new Error("Failed to process file");
    }
  }

  private async parseCSV(filePath: string): Promise<DataRow[]> {
    const data: DataRow[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row: DataRow) => data.push(row))
        .on("end", () => resolve(data))
        .on("error", (error) => {
          console.error("Error parsing CSV:", error);
          reject(new Error("Failed to parse CSV"));
        });
    });
  }

  private cleanupFile(filePath: string): void {
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error("Error deleting file:", error);
      }
    });
  }
}

export const fileService = new FileService();
