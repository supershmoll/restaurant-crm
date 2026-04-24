import { useEffect, useMemo, useState } from "react";
import { ORDER_CATEGORY_ORDER } from "@/features/orders/orderData";
import { loadTableOrder, saveTableOrder } from "@/features/orders/orderStorage";
import type { MenuDish, OrderCategory, OrderLineItem, TableOrderDetails } from "@/features/orders/orderTypes";

type OrderSection = {
  category: OrderCategory;
  items: OrderLineItem[];
};

export function useTableOrderDetails(tableId: number) {
  const [order, setOrder] = useState<TableOrderDetails>(() => loadTableOrder(tableId));

  useEffect(() => {
    setOrder(loadTableOrder(tableId));
  }, [tableId]);

  useEffect(() => {
    saveTableOrder(order);
  }, [order]);

  const sections = useMemo(() => getOrderSections(order.items), [order.items]);
  const subtotal = useMemo(() => order.items.reduce(sumOrderItemTotals, 0), [order.items]);
  const discountPercent = order.discountPercent;
  const discountAmount = useMemo(() => subtotal * (discountPercent / 100), [discountPercent, subtotal]);
  const total = useMemo(() => Math.max(0, subtotal - discountAmount), [discountAmount, subtotal]);

  function incrementItem(itemId: string) {
    setOrder(createQuantityUpdater(itemId, 1));
  }

  function decrementItem(itemId: string) {
    setOrder(createQuantityUpdater(itemId, -1));
  }

  function removeItem(itemId: string) {
    setOrder(createItemRemovalUpdater(itemId));
  }

  function updateItemNote(itemId: string, note: string) {
    setOrder(createItemNoteUpdater(itemId, note));
  }

  function setDiscountPercent(nextPercent: number) {
    setOrder(createDiscountUpdater(nextPercent));
  }

  function addDish(dish: MenuDish) {
    setOrder(createDishAdditionUpdater(dish));
  }

  return {
    items: order.items,
    sections,
    discountPercent,
    subtotal,
    discountAmount,
    total,
    hasItems: order.items.length > 0,
    incrementItem,
    decrementItem,
    removeItem,
    updateItemNote,
    setDiscountPercent,
    addDish,
  };
}

function getOrderSections(items: OrderLineItem[]): OrderSection[] {
  return ORDER_CATEGORY_ORDER.map(createSectionBuilder(items)).filter(hasSectionItems);
}

function createSectionBuilder(items: OrderLineItem[]) {
  return function buildOrderSection(category: OrderCategory): OrderSection {
    return {
      category,
      items: items.filter(createCategoryMatcher(category)),
    };
  };
}

function hasSectionItems(section: OrderSection) {
  return section.items.length > 0;
}

function createCategoryMatcher(category: OrderCategory) {
  return function matchCategory(item: OrderLineItem) {
    return item.category === category;
  };
}

function sumOrderItemTotals(total: number, item: OrderLineItem) {
  return total + item.price * item.quantity;
}

function createQuantityUpdater(itemId: string, delta: number) {
  return function updateQuantity(order: TableOrderDetails): TableOrderDetails {
    return {
      ...order,
      items: order.items.map(updateItemQuantity),
    };

    function updateItemQuantity(item: OrderLineItem) {
      if (item.id !== itemId) return item;

      return {
        ...item,
        quantity: Math.max(1, item.quantity + delta),
      };
    }
  };
}

function createItemRemovalUpdater(itemId: string) {
  return function removeOrderItem(order: TableOrderDetails): TableOrderDetails {
    return {
      ...order,
      items: order.items.filter(keepRemainingItems),
    };

    function keepRemainingItems(item: OrderLineItem) {
      return item.id !== itemId;
    }
  };
}

function createItemNoteUpdater(itemId: string, note: string) {
  return function updateItemNote(order: TableOrderDetails): TableOrderDetails {
    return {
      ...order,
      items: order.items.map(updateItem),
    };

    function updateItem(item: OrderLineItem) {
      if (item.id !== itemId) return item;

      return {
        ...item,
        note: note.trim().length > 0 ? note.trim() : undefined,
      };
    }
  };
}

function createDiscountUpdater(nextPercent: number) {
  return function updateDiscount(order: TableOrderDetails): TableOrderDetails {
    return {
      ...order,
      discountPercent: clampDiscount(nextPercent),
    };
  };
}

function createDishAdditionUpdater(dish: MenuDish) {
  return function addDishToOrder(order: TableOrderDetails): TableOrderDetails {
    const existingItem = order.items.find(createMenuDishMatcher(dish));
    if (existingItem) {
      return {
        ...order,
        items: order.items.map(incrementExistingDish),
      };
    }

    return {
      ...order,
      items: [
        ...order.items,
        {
          id: `${dish.id}-${Date.now()}`,
          category: dish.category,
          name: dish.name,
          price: dish.price,
          quantity: 1,
          image: dish.image,
        },
      ],
    };

    function incrementExistingDish(item: OrderLineItem) {
      if (!matchesDish(item, dish)) return item;

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    }
  };
}

function createMenuDishMatcher(dish: MenuDish) {
  return function matchMenuDish(item: OrderLineItem) {
    return matchesDish(item, dish);
  };
}

function matchesDish(item: OrderLineItem, dish: MenuDish) {
  return item.category === dish.category && item.name === dish.name && item.price === dish.price;
}

function clampDiscount(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}
