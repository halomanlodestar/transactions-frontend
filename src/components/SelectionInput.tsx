"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Stop } from "@/../types";

interface DynamicInputProps {
  fetchUrl: string;
  renderListItem: (item: any) => React.ReactNode;
  onSelect: (item: any) => void;
  debounceTime?: number;
}

export default function DynamicInput({
  fetchUrl,
  renderListItem,
  onSelect,
  debounceTime = 300,
}: DynamicInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [fetchedData, setFetchedData] = useState<Stop[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetch = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetchData(value);
      }, debounceTime);
    };
  }, [debounceTime]);

  const fetchData = useCallback(
    async (value: string) => {
      if (value.trim() === "") {
        setFetchedData([]);
        return;
      }

      setIsLoading(true);
      try {
        // const response = await fetch(`${fetchUrl}?q=${encodeURIComponent(value)}`)
        const response = await fetch(fetchUrl + value);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchedData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchUrl],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetch(value);
  };

  const handleSelectItem = (item: any) => {
    setInputValue(item.name || item.title || JSON.stringify(item));
    setFetchedData([]);
    onSelect(item);
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Start typing to search..."
        className="w-full"
      />
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
        </div>
      )}
      {fetchedData.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {fetchedData.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectItem(item)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {renderListItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
