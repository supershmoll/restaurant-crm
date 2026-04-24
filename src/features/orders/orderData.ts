import type { MenuDish, OrderCategory, OrderLineItem, Restaurant, RestaurantCuisine, TableOrderDetails } from "@/features/orders/orderTypes";

export const RESTAURANT_CUISINES: readonly RestaurantCuisine[] = ["Asian", "Thai", "Chinese", "Sushi"];

export const ORDER_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "Mikado",
    city: "New York City",
    cuisines: ["Asian", "Sushi"],
    price: "$$",
    distanceLabel: "100ft",
    service: ["delivery", "pickup"],
    rating: 4.8,
    coordinates: [40.7505, -73.9934],
    photos: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1562158070-57e9f7b7a30f?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    id: 2,
    name: "Nana Thai Street",
    city: "New York City",
    cuisines: ["Asian", "Thai"],
    price: "$$",
    distanceLabel: "500ft",
    service: ["delivery", "pickup"],
    rating: 4.7,
    coordinates: [40.7218, -73.9943],
    photos: [
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    id: 3,
    name: "Up Thai",
    city: "New York City",
    cuisines: ["Thai"],
    price: "$$",
    distanceLabel: "550ft",
    service: ["delivery"],
    rating: 4.6,
    coordinates: [40.7796, -73.9534],
    photos: [
      "https://images.unsplash.com/photo-1559314809-0f31657def5e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1604908176997-431115ddb2f4?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    id: 4,
    name: "MaLa Project",
    city: "New York City",
    cuisines: ["Chinese", "Asian"],
    price: "$$",
    distanceLabel: "900ft",
    service: ["delivery", "pickup"],
    rating: 4.5,
    coordinates: [40.7293, -73.9871],
    photos: [
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    id: 5,
    name: "Thai Noodle House",
    city: "New York City",
    cuisines: ["Thai"],
    price: "$$",
    distanceLabel: "900ft",
    service: ["delivery"],
    rating: 4.4,
    coordinates: [40.7469, -73.9862],
    photos: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1559314809-0f31657def5e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    id: 6,
    name: "Hamachi Sushi 34",
    city: "New York City",
    cuisines: ["Asian", "Sushi"],
    price: "$$$",
    distanceLabel: "1.2mi",
    service: ["pickup"],
    rating: 4.9,
    coordinates: [40.7499, -73.9848],
    photos: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1562158070-57e9f7b7a30f?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=300&q=80",
    ],
  },
];

export const ORDER_CATEGORY_ORDER: OrderCategory[] = ["Appetizer", "Main Course", "Drinks", "Dessert"];

export const ORDER_MENU_DISHES: MenuDish[] = [
  {
    id: "dish-bruschetta",
    category: "Appetizer",
    name: "Bruschetta",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-gyoza",
    category: "Appetizer",
    name: "Chicken Gyoza",
    price: 7.5,
    image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-spring-rolls",
    category: "Appetizer",
    name: "Vegetable Spring Rolls",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1604908176997-431115ddb2f4?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-caesar-salad",
    category: "Main Course",
    name: "Grilled Chicken Caesar Salad",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-cheeseburger",
    category: "Main Course",
    name: "Classic Cheeseburger with Fries",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-pad-thai",
    category: "Main Course",
    name: "Shrimp Pad Thai",
    price: 17.5,
    image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-ramen",
    category: "Main Course",
    name: "Tonkotsu Ramen",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-iced-tea",
    category: "Drinks",
    name: "Iced Tea",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-thai-milk-tea",
    category: "Drinks",
    name: "Thai Milk Tea",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-sparkling-water",
    category: "Drinks",
    name: "Sparkling Water",
    price: 3.25,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-cheesecake",
    category: "Dessert",
    name: "New York Cheesecake",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-mochi",
    category: "Dessert",
    name: "Mochi Ice Cream",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "dish-tiramisu",
    category: "Dessert",
    name: "Classic Tiramisu",
    price: 7.75,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80",
  },
];

const TABLE_ORDER_DETAILS: TableOrderDetails[] = [
  {
    tableId: 8,
    discountPercent: 0,
    items: [
      {
        id: "8-bruschetta",
        category: "Appetizer",
        name: "Bruschetta",
        price: 8.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "8-caesar-salad",
        category: "Main Course",
        name: "Grilled Chicken Caesar Salad",
        price: 12.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "8-cheeseburger",
        category: "Main Course",
        name: "Classic Cheeseburger with Fries",
        price: 14.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "8-iced-tea",
        category: "Drinks",
        name: "Iced Tea",
        price: 2.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "8-cheesecake",
        category: "Dessert",
        name: "New York Cheesecake",
        price: 6.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    tableId: 1,
    discountPercent: 0,
    items: [
      {
        id: "1-gyoza",
        category: "Appetizer",
        name: "Chicken Gyoza",
        price: 7.5,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "1-ramen",
        category: "Main Course",
        name: "Tonkotsu Ramen",
        price: 16.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "1-mochi",
        category: "Dessert",
        name: "Mochi Ice Cream",
        price: 5.5,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    tableId: 2,
    discountPercent: 0,
    items: [
      {
        id: "2-spring-rolls",
        category: "Appetizer",
        name: "Vegetable Spring Rolls",
        price: 6.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1604908176997-431115ddb2f4?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "2-pad-thai",
        category: "Main Course",
        name: "Shrimp Pad Thai",
        price: 17.5,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "2-thai-tea",
        category: "Drinks",
        name: "Thai Milk Tea",
        price: 4.5,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];

export function getMockTableOrder(tableId: number): TableOrderDetails | null {
  const order = TABLE_ORDER_DETAILS.find(createTableOrderMatcher(tableId));
  if (!order) return null;

  return cloneTableOrderDetails(order);
}

function createTableOrderMatcher(tableId: number) {
  return function matchTableOrder(order: TableOrderDetails) {
    return order.tableId === tableId;
  };
}

function cloneOrderLineItem(item: OrderLineItem): OrderLineItem {
  return {
    ...item,
  };
}

export function cloneTableOrderDetails(order: TableOrderDetails): TableOrderDetails {
  return {
    tableId: order.tableId,
    discountPercent: order.discountPercent,
    items: order.items.map(cloneOrderLineItem),
  };
}

export function createEmptyTableOrder(tableId: number): TableOrderDetails {
  return {
    tableId,
    discountPercent: 0,
    items: [],
  };
}

export function getMenuDishes(category?: OrderCategory): MenuDish[] {
  if (!category) {
    return ORDER_MENU_DISHES.map(cloneMenuDish);
  }

  return ORDER_MENU_DISHES.filter(createMenuCategoryMatcher(category)).map(cloneMenuDish);
}

function createMenuCategoryMatcher(category: OrderCategory) {
  return function matchMenuCategory(dish: MenuDish) {
    return dish.category === category;
  };
}

function cloneMenuDish(dish: MenuDish): MenuDish {
  return {
    ...dish,
  };
}
