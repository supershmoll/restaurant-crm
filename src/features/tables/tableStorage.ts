import type { TableItem } from "@/features/tables/tableTypes";
import rawTablesJson from "@/mocks/tables.json?raw";

const TABLES_STORAGE_KEY = "employee.tables";

function isTableStatus(value: unknown): value is TableItem["status"] {
  return value === "free" || value === "occupied" || value === "reserved";
}

function normalizeTableItem(value: unknown): TableItem | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== "number" || typeof candidate.label !== "string" || !isTableStatus(candidate.status)) {
    return null;
  }

  const reservedTime = candidate.status === "reserved"
    && typeof candidate.reservedTime === "string"
    && candidate.reservedTime.trim().length > 0
    ? candidate.reservedTime.trim()
    : undefined;

  return {
    id: candidate.id,
    label: candidate.label,
    status: candidate.status,
    reservedTime,
  };
}

function parseTables(raw: string): TableItem[] | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;

    const tables = parsed
      .map(normalizeTableItem)
      .filter((table): table is TableItem => table !== null);

    return tables.length > 0 ? tables : null;
  } catch {
    return null;
  }
}

function cloneTables(tables: TableItem[]): TableItem[] {
  return tables.map((table) => ({ ...table }));
}

const DEFAULT_TABLES = parseTables(rawTablesJson) ?? [];

export function getMockTables(): TableItem[] {
  return cloneTables(DEFAULT_TABLES);
}

export function loadTables(): TableItem[] {
  if (typeof window === "undefined") return getMockTables();

  const stored = localStorage.getItem(TABLES_STORAGE_KEY);
  if (!stored) return getMockTables();

  const parsed = parseTables(stored);
  return cloneTables(parsed ?? getMockTables());
}

export function getTableById(tableId: number): TableItem | null {
  return loadTables().find(createTableIdMatcher(tableId)) ?? null;
}
export function saveTables(tables: TableItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(tables));
}

function createTableIdMatcher(tableId: number) {
  return function matchTableById(table: TableItem) {
    return table.id === tableId;
  };
}
