import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import TableCard from "@/components/tables/TableCard";
import TableListItem from "@/components/tables/TableListItem";
import TableListModal from "@/components/tables/TableListModal";
import TableStateModal from "@/components/tables/TableStateModal";
import type { TableStatus } from "@/components/tables/tableStatus";
import type { TableItem } from "@/features/tables/tableTypes";
import { loadTables, saveTables } from "@/features/tables/tableStorage";
import { useFilterModal } from "@/hooks/useFilterModal";

const SUMMARY_CARDS: { title: string; status: TableStatus }[] = [
  { title: "Free", status: "free" },
  { title: "Occupied", status: "occupied" },
  { title: "Reserved", status: "reserved" },
];

const TABLE_MODAL_CONFIG = {
  free: { title: "Free Tables", predicate: isFreeTable },
  occupied: { title: "Occupied Tables", predicate: isOccupiedTable },
  reserved: { title: "Reserved Tables", predicate: isReservedTable },
} satisfies Record<TableStatus, { title: string; predicate: (table: TableItem) => boolean }>;

function isFreeTable(table: TableItem) {
  return table.status === "free";
}

function isOccupiedTable(table: TableItem) {
  return table.status === "occupied";
}

function isReservedTable(table: TableItem) {
  return table.status === "reserved";
}

function getSelectedTable(tables: TableItem[], selectedTableId: number | null) {
  if (selectedTableId === null) return null;
  return tables.find((table) => table.id === selectedTableId) ?? null;
}

function getSummaryCards(tables: TableItem[]) {
  const counts = tables.reduce<Record<TableStatus, number>>(
    (acc, table) => {
      acc[table.status] += 1;
      return acc;
    },
    { free: 0, occupied: 0, reserved: 0 }
  );

  return SUMMARY_CARDS.map((item) => ({
    title: item.title,
    status: item.status,
    value: counts[item.status],
  }));
}

export default function TablesOverviewPage() {
  const [tables, setTables] = useState<TableItem[]>(() => loadTables());
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  useEffect(() => {
    saveTables(tables);
  }, [tables]);

  type ModalKind = TableStatus;
  const selected = getSelectedTable(tables, selectedTableId);
  const summaryCards = getSummaryCards(tables);

  const tableModal = useFilterModal<TableItem, ModalKind>({
    items: tables,
    config: TABLE_MODAL_CONFIG,
    initialKind: "free" satisfies ModalKind,
  });

  function handleSelectTable(id: number) {
    setSelectedTableId(id);
  }

  function handleCloseSelectedTable() {
    setSelectedTableId(null);
  }

  function handleOpenTableModal(status: ModalKind) {
    tableModal.openModal(status);
  }

  function handleSelectTableFromModal(id: number) {
    tableModal.closeModal();
    handleSelectTable(id);
  }

  function handleSaveTable(next: { status: TableStatus; reservedTime?: string }) {
    if (selectedTableId === null) return;

    setTables((prev) =>
      prev.map((table) =>
        table.id === selectedTableId ? { ...table, status: next.status, reservedTime: next.reservedTime } : table
      )
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1132px] flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryCards.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            viewValue={item.status}
            actionLabel="Show"
            onView={handleOpenTableModal}
          />
        ))}
      </div>

      <section className="rounded-[28px] border border-black/5 bg-[#FCFCFC] p-4 sm:p-5 lg:px-7 lg:py-6">
        <div className="flex flex-col gap-3 lg:hidden">
          {tables.map((table) => (
            <TableListItem
              key={table.id}
              id={table.id}
              label={table.label}
              status={table.status}
              reservedTime={table.reservedTime}
              onSelect={handleSelectTable}
            />
          ))}
        </div>

        <div className="hidden lg:grid lg:justify-between lg:gap-y-8 lg:[grid-template-columns:repeat(6,115px)]">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              id={table.id}
              label={table.label}
              status={table.status}
              reservedTime={table.reservedTime}
              onSelect={handleSelectTable}
            />
          ))}
        </div>
      </section>

      <TableListModal
        open={tableModal.open}
        title={tableModal.title}
        tables={tableModal.items}
        onClose={tableModal.closeModal}
        onSelectTable={handleSelectTableFromModal}
      />

      <TableStateModal
        open={selectedTableId !== null && selected !== null}
        tableId={selected?.id ?? 0}
        tableLabel={selected?.label ?? ""}
        status={selected?.status ?? "free"}
        reservedTime={selected?.reservedTime}
        onClose={handleCloseSelectedTable}
        onSave={handleSaveTable}
      />
    </div>
  );
}
