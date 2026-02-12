import { generateMealPlan } from "@/lib/planner";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  peopleCount: z.coerce.number().int().min(1).max(12),
  budgetDkk: z.coerce.number().int().min(0).optional(),
  preference: z.enum(["standard", "vegetar", "high-protein"]),
  excludeIngredients: z.array(z.string()).default([])
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const payload = bodySchema.parse(rawBody);
    const mealPlan = generateMealPlan(payload);

    return NextResponse.json(mealPlan);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Uventet fejl under planlægning"
      },
      { status: 400 }
    );
  }
}
