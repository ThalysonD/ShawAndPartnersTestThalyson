import { Request } from "express";
import { fileService } from "../../../src/services/file.service";
import fs, { ReadStream } from "fs";
import csvParser from "csv-parser";

jest.mock("fs");
jest.mock("csv-parser");

describe("FileService", () => {
  let req: Partial<Request>;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    req = {
      file: {
        path: "test/path",
      } as Express.Multer.File,
    };
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  it("should process the file and return data", async () => {
    const mockData = [{ key: "value" }];
    const createReadStreamMock: Partial<ReadStream> = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, callback) => {
        if (event === "data") {
          callback(mockData[0]);
        }
        if (event === "end") {
          callback();
        }
        return createReadStreamMock as ReadStream;
      }),
    };

    (fs.createReadStream as jest.Mock).mockReturnValue(createReadStreamMock);

    const data = await fileService.processFile(req as Request);

    expect(data).toEqual(mockData);
  });

  it("should throw an error if no file is uploaded", async () => {
    req.file = undefined;

    await expect(fileService.processFile(req as Request)).rejects.toThrow(
      "No file uploaded"
    );
  });

  it("should clean up the file after processing", async () => {
    const mockData = [{ key: "value" }];
    const createReadStreamMock: Partial<ReadStream> = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, callback) => {
        if (event === "data") {
          callback(mockData[0]);
        }
        if (event === "end") {
          callback();
        }
        return createReadStreamMock as ReadStream;
      }),
    };

    (fs.createReadStream as jest.Mock).mockReturnValue(createReadStreamMock);

    const unlinkMock = jest.fn(
      (path: string, callback: (err?: NodeJS.ErrnoException) => void) => {
        callback();
      }
    );
    (fs.unlink as unknown as jest.Mock).mockImplementation(unlinkMock);

    await fileService.processFile(req as Request);

    expect(unlinkMock).toHaveBeenCalledWith("test/path", expect.any(Function));
  });

  it("should throw an error if parsing CSV fails", async () => {
    const createReadStreamMock: Partial<ReadStream> = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, callback) => {
        if (event === "error") {
          callback(new Error("CSV parse error"));
        }
        return createReadStreamMock as ReadStream;
      }),
    };

    (fs.createReadStream as jest.Mock).mockReturnValue(createReadStreamMock);

    await expect(fileService.processFile(req as Request)).rejects.toThrow(
      "Failed to process file"
    );
  });
});
