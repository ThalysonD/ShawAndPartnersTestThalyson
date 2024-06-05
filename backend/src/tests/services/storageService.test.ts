import { StorageService, DataRow } from "../../../src/services/storage.service";

describe("StorageService", () => {
  let storageService: StorageService;

  beforeEach(() => {
    storageService = new StorageService();
  });

  it("should add data to storage", () => {
    const mockData: DataRow[] = [{ key: "value" }];
    storageService.addData(mockData);

    const storedData = Array.from(storageService["data"]);
    expect(storedData).toContainEqual({ key: "value" });
  });

  it("should search data in storage", () => {
    const mockData: DataRow[] = [{ key: "value" }, { key: "anothervalue" }];
    storageService.addData(mockData);

    const result = storageService.searchData("value");
    expect(result).toEqual([{ key: "value" }, { key: "anothervalue" }]);
  });

  it("should return all data if search term is empty", () => {
    const mockData: DataRow[] = [{ key: "value" }, { key: "anothervalue" }];
    storageService.addData(mockData);

    const result = storageService.searchData("");
    expect(result).toEqual(mockData);
  });

  it("should clear all data from storage", () => {
    const mockData: DataRow[] = [{ key: "value" }];
    storageService.addData(mockData);

    storageService.clearData();

    const storedData = Array.from(storageService["data"]);
    expect(storedData).toEqual([]);
  });

  it("should normalize data rows", () => {
    const dataRow: DataRow = { Key: "Value", AnotherKey: "AnotherValue" };
    const normalizedDataRow = storageService["normalizeDataRow"](dataRow);
    expect(normalizedDataRow).toEqual({
      key: "value",
      anotherkey: "anothervalue",
    });
  });
});
