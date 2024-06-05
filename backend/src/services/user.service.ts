import { DataRow, storageService } from "./storage.service";

export class UserService {
  searchUsers(searchTerm: string): DataRow[] {
    try {
      return storageService.searchData(searchTerm);
    } catch (error) {
      console.error("Error searching users:", error);
      throw new Error("Failed to search users");
    }
  }

  deleteAllUsers(): void {
    try {
      storageService.clearData();
    } catch (error) {
      console.error("Error deleting all users:", error);
      throw new Error("Failed to delete all users");
    }
  }
}

export const userService = new UserService();
