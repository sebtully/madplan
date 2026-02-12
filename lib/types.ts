export type DietaryPreference = "standard" | "vegetar" | "high-protein";

export type PlannerInput = {
  peopleCount: number;
  budgetDkk?: number;
  preference: DietaryPreference;
  excludeIngredients: string[];
};

export type Offer = {
  ingredient: string;
  store: string;
  discountedPrice: number;
  validUntil: string;
};

export type Recipe = {
  id: string;
  name: string;
  tags: string[];
  basePricePerPerson: number;
  ingredients: string[];
};

export type PlannedMeal = {
  day: string;
  recipeName: string;
  estimatedPrice: number;
  matchedOffers: Offer[];
};

export type MealPlanResponse = {
  input: PlannerInput;
  meals: PlannedMeal[];
  shoppingList: string[];
  totalEstimatedPrice: number;
};
