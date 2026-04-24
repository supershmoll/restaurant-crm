import { useCallback, useState } from "react";

type FilterModalConfigItem<T> = {
  title: string;
  predicate?: (item: T) => boolean;
};

type FilterModalConfig<T, K extends string> = Record<K, FilterModalConfigItem<T>>;

type UseFilterModalArgs<T, K extends string> = {
  items: T[];
  config: FilterModalConfig<T, K>;
  initialKind: K;
};

export function useFilterModal<T, K extends string>({ items, config, initialKind }: UseFilterModalArgs<T, K>) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<K>(initialKind);

  const activeConfig = config[kind];
  const predicate = activeConfig.predicate;
  const filteredItems = predicate ? items.filter(predicate) : items;

  const openModal = useCallback((nextKind: K) => {
    setKind(nextKind);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    kind,
    title: activeConfig.title,
    items: filteredItems,
    openModal,
    closeModal,
  };
}
