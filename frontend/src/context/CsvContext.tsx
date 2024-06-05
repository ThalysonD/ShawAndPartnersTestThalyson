"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useSWR from "swr";
import { CsvDataContextProps, CsvDataProviderProps, LogEntry } from "./types";
import { toast } from "react-toastify";
import { API_URL } from "@/api/config";

const CsvDataContext = createContext<CsvDataContextProps | undefined>(
  undefined
);

const LOG_KEY = "uploadLogs";

const generateLogId = () => `log_${new Date().getTime()}`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CsvDataProvider: React.FC<CsvDataProviderProps> = ({
  children,
}) => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLogs, setUploadLogs] = useState<LogEntry[]>(() => {
    const logs = localStorage.getItem(LOG_KEY);
    return logs ? JSON.parse(logs) : [];
  });

  const { data, mutate } = useSWR(`${API_URL}/users`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const addLogEntry = useCallback(
    (logEntry: LogEntry) => {
      const updatedLog = [logEntry, ...uploadLogs];
      localStorage.setItem(LOG_KEY, JSON.stringify(updatedLog));
      setUploadLogs(updatedLog);
    },
    [uploadLogs]
  );

  const uploadCsv = useCallback(
    async (file: File) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${API_URL}/files`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          addLogEntry({
            id: generateLogId(),
            message: "Uploading a file made in",
            date: new Date().toLocaleString(),
          });
          toast.success("Document successfully sent!");
          mutate();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    },
    [addLogEntry, mutate]
  );

  const deleteAllFiles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("All files have been successfully deleted!");
        setCsvData([]);
        addLogEntry({
          id: generateLogId(),
          message: "All files were deleted in!",
          date: new Date().toLocaleString(),
        });
        mutate();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error deleting files: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [addLogEntry, mutate]);

  const searchCsvData = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const searchData = await fetcher(`${API_URL}/users?q=${query}`);
      setCsvData(searchData.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error fetching CSV data: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAllNotifications = useCallback(() => {
    localStorage.removeItem(LOG_KEY);
    setUploadLogs([]);
    toast.info("All notifications have been cleared.");
  }, []);

  const clearSearch = useCallback(() => {
    if (data?.data) {
      setCsvData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (data?.data) {
      setCsvData(data.data);
    }
  }, [data]);

  return (
    <CsvDataContext.Provider
      value={{
        csvData,
        uploadCsv,
        searchCsvData,
        loading,
        clearSearch,
        uploadLogs,
        deleteAllFiles,
        clearAllNotifications,
      }}
    >
      {children}
    </CsvDataContext.Provider>
  );
};

export const useCsvData = () => {
  const context = useContext(CsvDataContext);
  if (!context) {
    throw new Error("useCsvData must be used within a CsvDataProvider");
  }
  return context;
};

export default CsvDataProvider;
