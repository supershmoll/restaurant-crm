import { cloneTableOrderDetails, createEmptyTableOrder, getMockTableOrder } from "@/features/orders/orderData";
import type { OrderCategory, OrderLineItem, TableOrderDetails } from "@/features/orders/orderTypes";

const TABLE_ORDERS_STORAGE_KEY = "employee.tableOrders";

export function loadTableOrder(tableId: number): TableOrderDetails {
  if (typeof window === "undefined") {
    return getInitialTableOrder(tableId);
  }

  const stored = localStorage.getItem(TABLE_ORDERS_STORAGE_KEY);
  if (!stored) {
    return getInitialTableOrder(tableId);
  }

  const parsed = parseTableOrders(stored);
  if (!parsed) {
    return getInitialTableOrder(tableId);
  }

  const match = parsed.find(createTableOrderMatcher(tableId));
  return match ? cloneTableOrderDetails(match) : getInitialTableOrder(tableId);
}

export function saveTableOrder(order: TableOrderDetails) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(TABLE_ORDERS_STORAGE_KEY);
  const parsed = parseTableOrders(stored ?? "") ?? [];
  const remaining = parsed.filter(excludeTableOrder(order.tableId));
  const next = [...remaining, cloneTableOrderDetails(order)];

  localStorage.setItem(TABLE_ORDERS_STORAGE_KEY, JSON.stringify(next));
}

function getInitialTableOrder(tableId: number) {
  return getMockTableOrder(tableId) ?? createEmptyTableOrder(tableId);
}

function parseTableOrders(raw: string): TableOrderDetails[] | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;

    const orders = parsed
      .map(normalizeTableOrderDetails)
      .filter(isTableOrderDetails);

    return orders;
  } catch {
    return null;
  }
}

function normalizeTableOrderDetails(value: unknown): TableOrderDetails | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.tableId !== "number") return null;
  if (typeof candidate.discountPercent !== "number") return null;
  if (!Array.isArray(candidate.items)) return null;

  const items = candidate.items.map(normalizeOrderLineItem).filter(isOrderLineItem);

  return {
    tableId: candidate.tableId,
    discountPercent: clampDiscount(candidate.discountPercent),
    items,
  };
}

function normalizeOrderLineItem(value: unknown): OrderLineItem | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== "string") return null;
  if (!isOrderCategory(candidate.category)) return null;
  if (typeof candidate.name !== "string") return null;
  if (typeof candidate.price !== "number") return null;
  if (typeof candidate.quantity !== "number") return null;
  if (typeof candidate.image !== "string") return null;

  return {
    id: candidate.id,
    category: candidate.category,
    name: candidate.name,
    price: candidate.price,
    quantity: Math.max(1, Math.floor(candidate.quantity)),
    image: candidate.image,
    note: typeof candidate.note === "string" && candidate.note.trim().length > 0 ? candidate.note.trim() : undefined,
  };
}

function isOrderCategory(value: unknown): value is OrderCategory {
  return value === "Appetizer" || value === "Main Course" || value === "Drinks" || value === "Dessert";
}

function createTableOrderMatcher(tableId: number) {
  return function matchTableOrder(order: TableOrderDetails) {
    return order.tableId === tableId;
  };
}

function excludeTableOrder(tableId: number) {
  return function keepTableOrder(order: TableOrderDetails) {
    return order.tableId !== tableId;
  };
}

function isTableOrderDetails(value: TableOrderDetails | null): value is TableOrderDetails {
  return value !== null;
}

function isOrderLineItem(value: OrderLineItem | null): value is OrderLineItem {
  return value !== null;
}

function clampDiscount(value: number) {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
}
