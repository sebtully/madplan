import { MealPlanner } from "@/components/meal-planner";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Madplan med tilbud</h1>
        <p className="text-slate-700">
          Første kode-skelet: frontend formular + backend API + databaseklargøring til ugentlig 7-dages
          aftensmadsplan.
        </p>
      </header>

      <MealPlanner />
    </main>
  );
}
