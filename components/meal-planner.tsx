"use client";

import { MealPlanResponse } from "@/lib/types";
import { FormEvent, useState } from "react";

type PlannerForm = {
  peopleCount: number;
  budgetDkk?: number;
  preference: "standard" | "vegetar" | "high-protein";
  excludeIngredients: string;
};

const DEFAULT_FORM: PlannerForm = {
  peopleCount: 4,
  budgetDkk: undefined,
  preference: "standard",
  excludeIngredients: ""
};

export function MealPlanner() {
  const [form, setForm] = useState<PlannerForm>(DEFAULT_FORM);
  const [result, setResult] = useState<MealPlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          peopleCount: form.peopleCount,
          budgetDkk: form.budgetDkk,
          preference: form.preference,
          excludeIngredients: form.excludeIngredients
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean)
        })
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message ?? "Kunne ikke generere madplan");
      }

      const payload: MealPlanResponse = await response.json();
      setResult(payload);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Ukendt fejl");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form className="grid gap-4 rounded-xl bg-white p-6 shadow-sm" onSubmit={onSubmit}>
        <h2 className="text-xl font-semibold">Opret madplan</h2>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Antal personer</span>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            min={1}
            max={12}
            type="number"
            value={form.peopleCount}
            onChange={(event) => setForm((prev) => ({ ...prev, peopleCount: Number(event.target.value) }))}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Ugebudget i DKK (valgfrit)</span>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            min={0}
            type="number"
            value={form.budgetDkk ?? ""}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                budgetDkk: event.target.value ? Number(event.target.value) : undefined
              }))
            }
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Kostpræference</span>
          <select
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={form.preference}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                preference: event.target.value as PlannerForm["preference"]
              }))
            }
          >
            <option value="standard">Standard</option>
            <option value="vegetar">Vegetar</option>
            <option value="high-protein">High Protein</option>
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Ingredienser der skal undgås (komma-separeret)</span>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            placeholder="fx laks, svinekød"
            type="text"
            value={form.excludeIngredients}
            onChange={(event) => setForm((prev) => ({ ...prev, excludeIngredients: event.target.value }))}
          />
        </label>

        <button
          className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Genererer..." : "Generér 7-dages plan"}
        </button>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>

      {result ? (
        <section className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">Din ugeplan</h3>
            <p className="text-sm text-slate-600">Estimeret total: {result.totalEstimatedPrice} DKK</p>
          </div>

          <ul className="grid gap-3">
            {result.meals.map((meal) => (
              <li className="rounded-lg border border-slate-200 p-3" key={`${meal.day}-${meal.recipeName}`}>
                <p className="font-medium">
                  {meal.day}: {meal.recipeName}
                </p>
                <p className="text-sm text-slate-600">Prisestimat: {meal.estimatedPrice} DKK</p>
                <p className="text-xs text-emerald-700">
                  Tilbud: {meal.matchedOffers.map((offer) => `${offer.ingredient} (${offer.store})`).join(", ") || "Ingen"}
                </p>
              </li>
            ))}
          </ul>

          <div>
            <h4 className="mb-2 font-semibold">Indkøbsliste</h4>
            <p className="text-sm text-slate-700">{result.shoppingList.join(", ")}</p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
