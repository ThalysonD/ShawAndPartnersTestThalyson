import { Request, Response } from "express";
import { userController } from "../../../src/controllers/user.controller";
import { storageService } from "../../../src/services/storage.service";

jest.mock("../../../src/services/storage.service");

describe("UserController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
    };
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it("should search users and return the result", async () => {
    const mockUsers = [{ name: "John Doe" }];
    (storageService.searchData as jest.Mock).mockReturnValue(mockUsers);

    req.query = { q: "John" };

    await userController.searchUsers(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ data: mockUsers });
    expect(storageService.searchData).toHaveBeenCalledWith("John");
  });

  it("should return an error if search fails", async () => {
    const errorMessage = "Search error";
    (storageService.searchData as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    req.query = { q: "John" };

    await userController.searchUsers(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: errorMessage });
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error searching users:",
      errorMessage
    );
  });

  it("should clear all users and return success message", async () => {
    await userController.deleteAllUsers(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "All users deleted successfully.",
    });
    expect(storageService.clearData).toHaveBeenCalled();
  });

  it("should return an error if clearing users fails", async () => {
    const errorMessage = "Clear error";
    (storageService.clearData as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await userController.deleteAllUsers(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: errorMessage });
    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error deleting all users:",
      errorMessage
    );
  });
});
