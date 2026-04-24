import type { TableStatus } from "@/components/tableStatus";

export type TableItem = {
  label: string;
  status: TableStatus;
  reservedTime?: string;
};
