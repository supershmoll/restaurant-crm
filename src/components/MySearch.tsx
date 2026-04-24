import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import useDebounce from "@/features/employees/useDebounce.ts";
import { cn } from "@/lib/utils";

type MySearchProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  delayMs?: number;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export default function MySearch({
  value,
  onValueChange,
  onSearch,
  delayMs = 300,
  placeholder = "Search",
  className,
  inputClassName,
}: MySearchProps) {
  const [internalValue, setInternalValue] = useState("");
  const search = value ?? internalValue;
  const debouncedSearch = useDebounce(search, delayMs);

  useEffect(() => {
    onSearch?.(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  function handleChange(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-black/6 bg-background-secondary px-4 py-3",
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-black/35" />

      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        value={search}
        className={cn(
          "w-full bg-transparent text-sm text-text outline-none placeholder:text-black/35",
          inputClassName
        )}
      />
    </div>
  );
}