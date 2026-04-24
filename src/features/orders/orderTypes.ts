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
