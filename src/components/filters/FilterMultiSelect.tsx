import FilterSelect, { type FilterOption } from "./FilterSelect";

export type FilterConfig<TValue extends string> = {
  id: string;
  label: string;
  value: TValue;
  options: readonly FilterOption<TValue>[];
  onChange: (value: TValue) => void;
};

type FilterMultiSelectProps = {
  title?: string;
  filters: readonly FilterConfig<any>[];
};

export default function FilterMultiSelect({
  title = "Filters",
  filters,
}: FilterMultiSelectProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-text">{title}</p>
      <div className="grid grid-cols-1 gap-3">
        {filters.map((f) => (
          <div key={f.id} className="space-y-1.5">
            <div className="text-xs font-semibold text-black/50">{f.label}</div>
            <FilterSelect
              label={f.label}
              value={f.value}
              options={f.options}
              onChange={f.onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

