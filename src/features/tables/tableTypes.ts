import type { TableStatus } from "@/components/tableStatus";

export type TableItem = {
  id: number;
  label: string;
  status: TableStatus;
  reservedTime?: string;
};
