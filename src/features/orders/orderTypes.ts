export type ServiceMode = "delivery" | "pickup";

export type RestaurantCuisine = "Asian" | "Thai" | "Chinese" | "Sushi";

export type Restaurant = {
  id: number;
  name: string;
  city: string;
  cuisines: RestaurantCuisine[];
  price: "$" | "$$" | "$$$";
  distanceLabel: string;
  service: ServiceMode[];
  rating: number;
  coordinates: [number, number];
  photos: [string, string, string, string];
};

export type OrderCategory = "Appetizer" | "Main Course" | "Drinks" | "Dessert";

export type MenuDish = {
  id: string;
  category: OrderCategory;
  name: string;
  price: number;
  image: string;
};

export type OrderLineItem = {
  id: string;
  category: OrderCategory;
  name: string;
  price: number;
  quantity: number;
  image: string;
  note?: string;
};

export type TableOrderDetails = {
  tableId: number;
  discountPercent: number;
  items: OrderLineItem[];
};
