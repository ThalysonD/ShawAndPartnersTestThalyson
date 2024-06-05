import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { useCsvData } from "@/context/CsvContext";

const SearchComponent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const { searchCsvData, loading, clearSearch } = useCsvData();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!input) {
        clearSearch?.();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [input, clearSearch]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && input) {
        searchCsvData(input);
      }
    },
    [input, searchCsvData]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return (
    <input
      type="text"
      placeholder="Search..."
      id="search-field"
      className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
      value={input}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={loading}
    />
  );
};

export default SearchComponent;
