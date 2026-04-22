export type FilterOption<TValue extends string> = {
  label: string;
  value: TValue;
};

export type FilterSelectProps<TValue extends string> = {
  label: string;
  value: TValue;
  options: readonly FilterOption<TValue>[];
  onChange: (value: TValue) => void;
  className?: string;
};

export default function FilterSelect<TValue extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: FilterSelectProps<TValue>) {
  return (
    <label className={className}>
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as TValue)}
        className="h-10 w-full rounded-xl bg-[#F6F6F6] px-4 text-sm font-medium text-text ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-black/15"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

