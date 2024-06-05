import { Request, Response } from "express";
import { fileController } from "../../../src/controllers/file.controller";
import { fileService } from "../../../src/services/file.service";
import { storageService } from "../../../src/services/storage.service";

jest.mock("../../../src/services/file.service");
jest.mock("../../../src/services/storage.service");

describe("FileController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    req = {
      file: {
        fieldname: "file",
        originalname: "test.csv",
        encoding: "7bit",
        mimetype: "text/csv",
        size: 12345,
        destination: "uploads/",
        filename: "test/path",
        path: "test/path",
        buffer: Buffer.from(""),
        stream: null as any,
      },
    };
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

  it("should upload a file and return success message", async () => {
    const mockData = [{ key: "value" }];
    (fileService.processFile as jest.Mock).mockResolvedValue(mockData);

    await fileController.uploadFile(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "The file was uploaded successfully.",
    });
    expect(fileService.processFile).toHaveBeenCalledWith(req);
    expect(storageService.addData).toHaveBeenCalledWith(mockData);
  });

  it("should return an error if no file is uploaded", async () => {
    req.file = undefined;

    await fileController.uploadFile(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: "No file uploaded" });
  });
});
