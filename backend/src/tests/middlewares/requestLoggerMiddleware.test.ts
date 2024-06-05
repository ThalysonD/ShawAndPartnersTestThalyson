import { Request, Response, NextFunction } from "express";
import requestLoggerMiddleware from "../../../src/middlewares/requestLogger.middleware";

describe("requestLoggerMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let consoleLogMock: jest.SpyInstance;

  beforeEach(() => {
    req = {
      method: "GET",
      originalUrl: "/test",
      body: { key: "value" },
      query: { q: "search" },
      params: { id: "123" },
      file: { filename: "testfile.csv" } as any,
    };
    res = {
      on: jest.fn(),
    };
    next = jest.fn();
    consoleLogMock = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
  });

  it("should log the request details", () => {
    requestLoggerMiddleware(req as Request, res as Response, next);

    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("GET /test")
    );
    expect(next).toHaveBeenCalled();
  });

  it("should log the request completion time on finish event", () => {
    const finishCallback = jest.fn();
    (res.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === "finish") {
        finishCallback.mockImplementation(callback);
      }
    });

    requestLoggerMiddleware(req as Request, res as Response, next);

    finishCallback();

    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("GET /test took")
    );
  });

  it("should log the request completion time on close event", () => {
    const closeCallback = jest.fn();
    (res.on as jest.Mock).mockImplementation((event, callback) => {
      if (event === "close") {
        closeCallback.mockImplementation(callback);
      }
    });

    requestLoggerMiddleware(req as Request, res as Response, next);

    closeCallback();

    expect(consoleLogMock).toHaveBeenCalledWith(
      expect.stringContaining("GET /test took")
    );
  });
});
