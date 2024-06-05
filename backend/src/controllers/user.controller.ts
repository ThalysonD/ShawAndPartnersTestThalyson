import { Request, Response } from "express";
import { storageService } from "../services/storage.service";

class UserController {
  async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const searchTerm = req.query.q as string;
      const users = storageService.searchData(searchTerm);
      res.status(200).json({ data: users });
    } catch (error) {
      console.error("Error searching users:", (error as Error).message);
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async deleteAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      storageService.clearData();
      res.status(200).json({ message: "All users deleted successfully." });
    } catch (error) {
      console.error("Error deleting all users:", (error as Error).message);
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export const userController = new UserController();
