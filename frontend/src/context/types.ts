import { User } from "@/components/Table/types";
import { ReactNode } from "react";

export interface CsvDataContextProps {
  uploadCsv: (file: File) => Promise<void>;
  deleteAllFiles: () => Promise<void>;
  searchCsvData: (query: string) => void;
  setSearchTerm?: (term: string) => void;
  clearAllNotifications?: () => void;
  clearSearch?: () => void;
  csvData: User[];
  loading?: boolean; 
  error?: string | null;
  uploadLogs: LogEntry[];
}

export interface CsvDataProviderProps {
  children: ReactNode;
}

export interface LogEntry {
  id: string;
  message: string;
  date: string; 
}