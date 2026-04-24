import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import AddDishModal from "@/components/orders/AddDishModal";
import CheckOrderModal from "@/components/orders/CheckOrderModal";
import OrderDiscountModal from "@/components/orders/OrderDiscountModal";
import OrderItemNoteModal from "@/components/orders/OrderItemNoteModal";
import TableOrderItemRow from "@/components/orders/TableOrderItemRow";
import { Button } from "@/components/ui/button";
import { useTableOrderDetails } from "@/features/orders/useTableOrderDetails";
import type { OrderCategory } from "@/features/orders/orderTypes";
import type { TableItem } from "@/features/tables/tableTypes";

type TableOrderDetailsPageProps = {
  table: TableItem;
};

export default function TableOrderDetailsPage({ table }: TableOrderDetailsPageProps) {
  const orderDetails = useTableOrderDetails(table.id);
  const [addDishModalOpen, setAddDishModalOpen] = useState(false);
  const [addDishCategory, setAddDishCategory] = useState<OrderCategory>("Main Course");
  const [checkOrderModalOpen, setCheckOrderModalOpen] = useState(false);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [activeNoteItemId, setActiveNoteItemId] = useState<string | null>(null);
  const activeNoteItem = useMemo(() => orderDetails.items.find(matchActiveNoteItem), [activeNoteItemId, orderDetails.items]);

  return (
    <>
      <section className="mx-auto flex w-full max-w-[1160px] flex-col gap-6">
        <div className="flex items-start gap-4">
          <Link
            to="/employee/tables"
            className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-text/70 ring-1 ring-black/5 transition hover:bg-[#F6F6F6]"
            aria-label="Back to tables"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <h2 className="text-3xl font-semibold text-text">Table {table.label}</h2>
            <p className="mt-1 text-sm text-text/55">Order details</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-black/5 bg-[#FCFCFC] shadow-[0_8px_24px_rgba(20,20,20,0.04)]">
          <div className="overflow-x-auto p-4 sm:p-5 lg:p-6">
            {orderDetails.hasItems ? (
              <table className="w-full min-w-[920px] border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em] text-text/40">
                    <th className="w-12 px-4 py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border-color accent-dark-button"
                        aria-label="Select all items"
                      />
                    </th>
                    <th className="px-2 py-4">Dish</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4">Total</th>
                    <th className="px-4 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>{orderDetails.sections.map(renderSection)}</tbody>
              </table>
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-black/10 bg-white text-center">
                <div className="text-xl font-semibold text-text">No items for this table yet</div>
                <p className="mt-2 max-w-md text-sm text-text/55">
                  This table does not have any mocked order items yet. You can still keep the route and layout in place for the next data pass.
                </p>
                <Button
                  type="button"
                  onClick={createAddDishOpener("Main Course")}
                  className="mt-4 rounded-xl bg-dark-button px-5 text-white hover:bg-dark-button/90"
                >
                  Add first dish
                </Button>
              </div>
            )}
          </div>

          <div className="border-t border-black/6 bg-white px-4 py-4 sm:px-5 lg:px-6">
            <div className="mb-2 text-sm font-semibold text-text/60">Total</div>
            <div className="flex flex-col gap-4 rounded-[20px] border border-black/10 p-3 sm:p-4">
              <div className="grid gap-2 text-sm text-text/70 sm:grid-cols-[1fr_auto]">
                <div>Subtotal</div>
                <div className="font-medium text-text">{formatCurrency(orderDetails.subtotal)}</div>

                <div>Discount{orderDetails.discountPercent > 0 ? ` (${orderDetails.discountPercent}%)` : ""}</div>
                <div className="font-medium text-text">{orderDetails.discountAmount > 0 ? `- ${formatCurrency(orderDetails.discountAmount)}` : formatCurrency(0)}</div>

                <div className="text-base font-semibold text-text">Final total</div>
                <div className="text-[24px] font-semibold text-text sm:text-[38px]">{formatCurrency(orderDetails.total)}</div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={openDiscountModal}
                  className="h-11 rounded-xl border-black/10 px-5 text-sm font-semibold text-text"
                >
                  Discount
                </Button>
                <Button
                  type="button"
                  onClick={openCheckOrderModal}
                  className="h-11 rounded-xl bg-dark-button px-5 text-sm font-semibold text-white hover:bg-dark-button/90"
                >
                  Check Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddDishModal
        open={addDishModalOpen}
        initialCategory={addDishCategory}
        onClose={closeAddDishModal}
        onAddDish={orderDetails.addDish}
      />

      <CheckOrderModal
        open={checkOrderModalOpen}
        tableLabel={table.label}
        sections={orderDetails.sections}
        subtotal={orderDetails.subtotal}
        discountPercent={orderDetails.discountPercent}
        discountAmount={orderDetails.discountAmount}
        total={orderDetails.total}
        onClose={closeCheckOrderModal}
      />

      <OrderDiscountModal
        open={discountModalOpen}
        initialPercent={orderDetails.discountPercent}
        onClose={closeDiscountModal}
        onSave={orderDetails.setDiscountPercent}
      />

      <OrderItemNoteModal
        open={activeNoteItem !== undefined && activeNoteItem !== null}
        itemName={activeNoteItem?.name ?? ""}
        initialNote={activeNoteItem?.note}
        onClose={closeNoteModal}
        onSave={handleSaveNote}
      />
    </>
  );

  function renderSection(section: (typeof orderDetails.sections)[number]) {
    return (
      <>
        <tr key={`${section.category}-heading`} className="bg-[#FAFAFA]">
          <td className="px-4 py-4">
            <button
              type="button"
              onClick={createAddDishOpener(section.category)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#353535] text-white transition hover:bg-[#454545]"
              aria-label={`Add ${section.category} dish`}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </td>
          <td colSpan={5} className="px-2 py-4 text-sm font-semibold text-text/45">
            {section.category}
          </td>
        </tr>
        {section.items.map(renderItemRow)}
      </>
    );
  }

  function renderItemRow(item: (typeof orderDetails.sections)[number]["items"][number]) {
    return (
      <TableOrderItemRow
        key={item.id}
        item={item}
        onIncrement={orderDetails.incrementItem}
        onDecrement={orderDetails.decrementItem}
        onRemove={orderDetails.removeItem}
        onEditNote={handleEditNote}
      />
    );
  }

  function openDiscountModal() {
    setDiscountModalOpen(true);
  }

  function createAddDishOpener(category: OrderCategory) {
    return function openAddDishModal() {
      setAddDishCategory(category);
      setAddDishModalOpen(true);
    };
  }

  function closeAddDishModal() {
    setAddDishModalOpen(false);
  }

  function openCheckOrderModal() {
    setCheckOrderModalOpen(true);
  }

  function closeCheckOrderModal() {
    setCheckOrderModalOpen(false);
  }

  function closeDiscountModal() {
    setDiscountModalOpen(false);
  }

  function handleEditNote(itemId: string) {
    setActiveNoteItemId(itemId);
  }

  function closeNoteModal() {
    setActiveNoteItemId(null);
  }

  function handleSaveNote(note: string) {
    if (!activeNoteItemId) return;
    orderDetails.updateItemNote(activeNoteItemId, note);
  }

  function matchActiveNoteItem(item: (typeof orderDetails.items)[number]) {
    return item.id === activeNoteItemId;
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
