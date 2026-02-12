import { SAMPLE_OFFERS, SAMPLE_RECIPES } from "@/lib/sample-data";
import { MealPlanResponse, Offer, PlannedMeal, PlannerInput, Recipe } from "@/lib/types";

const DAYS = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];

function matchesPreference(recipe: Recipe, preference: PlannerInput["preference"]): boolean {
  if (preference === "standard") {
    return true;
  }

  return recipe.tags.includes(preference);
}

function hasExcludedIngredients(recipe: Recipe, excluded: string[]): boolean {
  return recipe.ingredients.some((ingredient) => excluded.includes(ingredient.toLowerCase()));
}

function getOffersForRecipe(recipe: Recipe, offers: Offer[]): Offer[] {
  return offers.filter((offer) => recipe.ingredients.includes(offer.ingredient));
}

function estimateRecipePrice(recipe: Recipe, peopleCount: number, matchedOffers: Offer[]): number {
  const base = recipe.basePricePerPerson * peopleCount;
  const discount = matchedOffers.length * 4;
  return Math.max(0, base - discount);
}

function pickSevenRecipes(candidates: Recipe[]): Recipe[] {
  if (candidates.length === 0) {
    return [];
  }

  return Array.from({ length: 7 }, (_, index) => candidates[index % candidates.length]);
}

export function generateMealPlan(input: PlannerInput): MealPlanResponse {
  const excluded = input.excludeIngredients.map((item) => item.trim().toLowerCase()).filter(Boolean);

  const candidates = SAMPLE_RECIPES.filter(
    (recipe) => matchesPreference(recipe, input.preference) && !hasExcludedIngredients(recipe, excluded)
  );

  const selectedRecipes = pickSevenRecipes(candidates);

  if (selectedRecipes.length === 0) {
    throw new Error("Ingen opskrifter matcher de valgte kriterier.");
  }

  const meals: PlannedMeal[] = selectedRecipes.map((recipe, index) => {
    const matchedOffers = getOffersForRecipe(recipe, SAMPLE_OFFERS);
    const estimatedPrice = estimateRecipePrice(recipe, input.peopleCount, matchedOffers);

    return {
      day: DAYS[index],
      recipeName: recipe.name,
      estimatedPrice,
      matchedOffers
    };
  });

  const shoppingList = Array.from(new Set(selectedRecipes.flatMap((recipe) => recipe.ingredients))).sort();
  const totalEstimatedPrice = meals.reduce((sum, meal) => sum + meal.estimatedPrice, 0);

  return {
    input,
    meals,
    shoppingList,
    totalEstimatedPrice
  };
}
