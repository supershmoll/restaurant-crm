import type { TableStatus } from "@/components/tables/tableStatus";

export type TableItem = {
  id: number;
  label: string;
  status: TableStatus;
  reservedTime?: string;
};
