import { UserService } from "../../../src/services/user.service";
import { storageService } from "../../../src/services/storage.service";
import { DataRow } from "../../../src/services/storage.service";

jest.mock("../../../src/services/storage.service");

describe("UserService", () => {
  let userService: UserService;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    userService = new UserService();
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it("should search users and return the result", () => {
    const mockUsers: DataRow[] = [{ key: "value" }];
    (storageService.searchData as jest.Mock).mockReturnValue(mockUsers);

    const result = userService.searchUsers("value");

    expect(result).toEqual(mockUsers);
    expect(storageService.searchData).toHaveBeenCalledWith("value");
  });

  it("should throw an error if search fails", () => {
    const errorMessage = "Search error";
    (storageService.searchData as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    expect(() => userService.searchUsers("value")).toThrow(
      "Failed to search users"
    );
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error searching users:",
      new Error(errorMessage)
    );
  });

  it("should delete all users", () => {
    userService.deleteAllUsers();

    expect(storageService.clearData).toHaveBeenCalled();
  });

  it("should throw an error if deleting users fails", () => {
    const errorMessage = "Delete error";
    (storageService.clearData as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    expect(() => userService.deleteAllUsers()).toThrow(
      "Failed to delete all users"
    );
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error deleting all users:",
      new Error(errorMessage)
    );
  });
});
