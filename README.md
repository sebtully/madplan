# Madplan – kode-skelet (frontend + backend + database)

Dette repository indeholder et **konkret første skelet** til en webapp, der genererer en 7-dages aftensmadsplan for et valgfrit antal personer med fokus på tilbud (fx Føtex Food).

## Stack
- **Frontend:** Next.js App Router + TypeScript + Tailwind
- **Backend:** Next.js API route (`POST /api/meal-plan`)
- **Database:** PostgreSQL + Prisma schema + seed-script

## Mappe-struktur

```txt
.
├── app/
│   ├── api/meal-plan/route.ts      # Backend endpoint til plan-generering
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                    # Frontend side
├── components/
│   └── meal-planner.tsx            # UI formular + visning af resultat
├── lib/
│   ├── db.ts                       # Prisma client singleton
│   ├── planner.ts                  # Simpel planlægningsmotor
│   ├── sample-data.ts              # Demo-opskrifter og tilbud
│   └── types.ts                    # Delte typer
├── prisma/
│   ├── schema.prisma               # Datamodel
│   └── seed.ts                     # Seed af opskrifter/tilbud
├── .env.example
├── package.json
└── README.md
```

## Funktionalitet i dette skelet

### Frontend (MVP)
- Input:
  - antal personer
  - budget (valgfrit)
  - kostpræference (`standard`, `vegetar`, `high-protein`)
  - ingredienser, der skal undgås
- Output:
  - 7 dages madplan
  - prisestimat pr. ret + total
  - markering af tilbud der påvirker retterne
  - indkøbsliste

### Backend endpoint
- `POST /api/meal-plan`
- Validerer input med `zod`
- Kalder en simpel plan-generator i `lib/planner.ts`

### Database (Prisma)
Følgende modeller er defineret:
- `Household`
- `Recipe`
- `StoreOffer`
- `MealPlan`
- `MealPlanRecipe`

## Kom i gang

1. Installer dependencies:
   ```bash
   npm install
   ```
2. Opret miljøvariabler:
   ```bash
   cp .env.example .env
   ```
3. Kør migration + generate:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. Seed demo-data:
   ```bash
   npm run prisma:seed
   ```
5. Start appen:
   ```bash
   npm run dev
   ```

Åbn derefter `http://localhost:3000`.

## Næste tekniske skridt
- Erstat `lib/sample-data.ts` med data hentet fra database
- Byg tilbudsimport (CSV/parsing pipeline)
- Tilføj bedre scoremodel (variation, ernæring, budget-vægtning)
- Lav login + gemte husstandsprofiler
