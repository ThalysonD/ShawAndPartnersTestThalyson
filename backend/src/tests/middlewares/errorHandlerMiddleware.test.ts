import { Request, Response, NextFunction } from "express";
import errorHandlerMiddleware from "../../../src/middlewares/errorHandler.middleware";

describe("errorHandlerMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
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
    next = jest.fn();
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it("should handle an error and return 500 with error message in development mode", () => {
    process.env.NODE_ENV = "development";
    const error = new Error("Test error");

    errorHandlerMiddleware(error, req as Request, res as Response, next);

    expect(consoleErrorMock).toHaveBeenCalledWith("Error:", error);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: "Test error",
      details: error.stack,
    });
    expect(next).toHaveBeenCalled();
  });

  it("should handle an error and return 500 with generic message in production mode", () => {
    process.env.NODE_ENV = "production";
    const error = new Error("Test error");

    errorHandlerMiddleware(error, req as Request, res as Response, next);

    expect(consoleErrorMock).toHaveBeenCalledWith("Error:", error);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: "Internal Server Error",
      details: undefined,
    });
    expect(next).toHaveBeenCalled();
  });
});
