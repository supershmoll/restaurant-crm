import { useEffect, useState } from "react";
import useDebounce from "@/features/employees/useDebounce.ts";

type MySearchProps = {
  onSearch?: (value: string) => void;
  delayMs?: number;
  placeholder?: string;
};

export default function MySearch({
  onSearch,
  delayMs = 300,
  placeholder = "Search",
}: MySearchProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, delayMs);

  useEffect(() => {
    onSearch?.(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
}