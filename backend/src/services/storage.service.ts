export type DataRow = Record<string, string>;

export class StorageService {
  private data: Set<DataRow> = new Set();

  addData(newData: DataRow[]): void {
    newData.forEach((item) => {
      const normalizedItem = this.normalizeDataRow(item);
      this.data.add(normalizedItem);
    });
  }

  searchData(searchTerm: string): DataRow[] {
    if (!searchTerm) {
      return Array.from(this.data);
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return Array.from(this.data).filter((row) =>
      Object.values(row).some((value) => value.includes(lowercasedSearchTerm))
    );
  }

  clearData(): void {
    this.data.clear();
  }

  private normalizeDataRow(dataRow: DataRow): DataRow {
    const normalizedDataRow: DataRow = {};
    for (const [key, value] of Object.entries(dataRow)) {
      normalizedDataRow[key.toLowerCase()] = value.toLowerCase();
    }
    return normalizedDataRow;
  }
}

export const storageService = new StorageService();
