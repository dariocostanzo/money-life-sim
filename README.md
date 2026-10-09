# Money Life Sim

## Project Purpose

Money Life Sim is a financial education game for UK children aged 12-16. Players progress through a 5-level game flow — Career, Housing, Utilities, Transport, and Results — making lifestyle decisions and watching a budget HUD come together, to learn about income, spending, saving, budgeting, and real-world financial trade-offs, all through gameplay rather than a finance lesson. At the Results step, the game springs two follow-up questions on the player — "What about food?" and "What about savings?" — before showing the final picture, because it's easy to forget everyday costs and to treat savings as an afterthought rather than a planned outgoing.

## Technology Stack

- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (dev server and build tool)

No backend, database, or authentication — all data is hardcoded in TypeScript for the MVP.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (bundled with Node.js)

## Installation

```bash
npm install
```

## Configuration

No configuration or environment variables are required for this project.

## Development Commands

Start the local dev server with hot reload:

```bash
npm run dev
```

## Build Commands

Type-check and build a production bundle (output to `dist/`):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Local Run Instructions

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the Application URL below in your browser.

## Application URL

http://localhost:5173/

## Environment Variables

None.

## Current Implemented Features

### Game Flow: Multi-Step Wizard

The app is a 5-level stepper, not a scrolling page — only one step is ever on screen at a time:

1. **Choose Your Career**
2. **Choose Where You'll Live**
3. **Choose Your Energy Usage**
4. **Choose How You'll Get Around**
5. **Your Results** (which also asks "What about food?" and "What about savings?")

Every step shows a game-HUD style progress bar at the top: a **Level Chip** (`LEVEL X OF 5`) and an **XP Progress Bar** that fills in as the player advances. Selecting an option **automatically advances** to the next step — there is no manual Next button. A **Previous** button lets players go back and reconsider an earlier choice at any time, and their prior selections persist. The running budget HUD is only shown once the Results step reaches its final summary, where the whole picture comes together.

### Phase 1: Career Selection

- Player selects a career from a grid of responsive, colourful cards.
- Each card shows the career avatar, career name, annual salary, and estimated monthly take-home pay.
- Picking a career automatically advances to the next step.
- Players can go back and change their selection at any time.

**Careers included:** Teacher, Nurse, Doctor, Police Officer, Plumber, Lawyer, Scientist, Software Developer.

**Data sources for salary figures** (see `src/data/careers.ts` for per-career citations):
- [Get Into Teaching (Department for Education)](https://getintoteaching.education.gov.uk/life-as-a-teacher/pay-and-benefits/teacher-pay) — Teacher
- [NHS Employers, Agenda for Change pay scales](https://www.nhsemployers.org/articles/pay-scales-202526) — Nurse
- [NHS Health Careers](https://www.healthcareers.nhs.uk/explore-roles/doctors/pay-doctors) — Doctor
- [Police Remuneration Review Body 2025 report (GOV.UK)](https://www.gov.uk/government/publications/police-remuneration-review-body-report-2025-england-and-wales) — Police Officer
- [National Careers Service](https://nationalcareers.service.gov.uk/) — Plumber, Lawyer, Scientist, Software Developer

**Take-home pay calculation** uses the published 2025/26 UK Income Tax and National Insurance rates and thresholds from [GOV.UK Income Tax rates](https://www.gov.uk/income-tax-rates) and [GOV.UK rates and thresholds for employers 2025 to 2026](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026). The calculation (`src/lib/payCalculations.ts`) is simplified for an educational game: it assumes a standard tax code with no pension contributions, student loan repayments, or other deductions.

### Phase 2: Housing Choices

- Once a career is selected, the player picks where to live from three housing options.
- Each housing card shows the monthly cost.
- Picking an option automatically advances to the next step; players can go back and change it at any time.

**Housing options included:** Live with Family, Shared Accommodation, One-Bedroom Flat.

**Data sources for housing cost figures** (see `src/data/housing.ts` for per-option citations):
- [Compare the Market survey of UK parents](https://www.comparethemarket.com/home-insurance/content/how-much-rent-do-parents-charge/) (May 2023) — Live with Family
- [SpareRoom Rental Index](https://www.spareroom.co.uk/content/info-landlords/rentalindex/), UK average room rent, Q3 2025 — Shared Accommodation
- [ONS Private Rent and House Prices, UK](https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/privaterentandhousepricesuk/november2025), average rent for a one-bedroom property, November 2025 — One-Bedroom Flat

### Phase 3: Utilities Choices

- Once a career is selected, the player also picks an energy usage level from three options: Basic, Average, High Usage.
- Each utilities card shows the monthly cost.
- Picking an option automatically advances to the next step; players can go back and change it at any time.

**Utilities options included:** Basic, Average, High Usage.

**Data sources for utilities cost figures** (see `src/data/utilities.ts` for per-option citations):
- [Ofgem Typical Domestic Consumption Values](https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges), "low" usage household under the October to December 2025 energy price cap — Basic
- [Ofgem Typical Domestic Consumption Values](https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges), "medium" (typical) usage household under the October to December 2025 energy price cap — Average
- [Ofgem Typical Domestic Consumption Values](https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges), "high" usage household under the October to December 2025 energy price cap — High Usage

### Phase 4: Transport Choices

- Once a career is selected, the player also picks how they get around from three options: Walk / Cycle, Public Transport, Car.
- Each transport card shows the monthly cost.
- Picking an option automatically advances to the Results step; players can go back and change it at any time.

**Transport options included:** Walk / Cycle, Public Transport, Car.

**Data sources for transport cost figures** (see `src/data/transport.ts` for per-option citations):
- [Cycling UK](https://www.cyclinguk.org/article/how-much-money-can-you-save-cycling), typical bicycle service cost — Walk / Cycle
- [Transport for London](https://tfl.gov.uk/fares/find-fares/bus-and-tram-fares), adult Monthly Bus & Tram Pass price — Public Transport
- [RAC Report on Motoring 2025](https://www.rac.co.uk/report-on-motoring), average annual cost of running a car excluding finance and depreciation — Car

### Results Step: "What about food?", "What about savings?", and the Financial Health Score

The Results step doesn't just dump a summary on the player — it walks through two follow-up questions first, each shown on its own screen with a running "money left so far" banner:

1. **🤔 But what about food?** — the player sees how much is left after housing, utilities, and transport, then picks a food budget from the same three options used elsewhere in the game: Budget, Typical, Premium (see `src/data/food.ts` for sourced monthly costs — [GOV.UK Family Food FYE 2025](https://www.gov.uk/government/statistics/family-food-fye-2025/family-food-fye-2025) for Budget, [Loughborough University Minimum Income Standard (MIS) 2024 Rebase](https://www.lboro.ac.uk/research/crsp/minimum-income-standard/) for Typical and Premium).
2. **💰 What about savings?** — with food now included, the player sees the updated money left and picks a savings goal: No Savings, 5%, 10%, 15%, or 20%+ of take-home pay (`src/data/savings.ts`). This is a **game-design choice, not a cited UK statistic** — there's no "experts recommend X%" claim, just the player deciding how much to set aside.

Picking an option on either screen automatically advances to the next; both choices persist, and the "Change food" / "Change savings" buttons at the summary (see below) jump straight back to them.

The final summary shows a ✅/⚠️ outcome headline ("You have £X left over" or "You're overspending by £X"), the game-HUD style budget bar with 💰 Monthly Income, 🏠 Housing, ⚡ Utilities, 🚌 Transport, 🍔 Food, 🐷 Savings, and ✅/⚠️ Money Left Over, plus a **Financial Health Score out of 100** and a feedback tier:

| Score | Tier |
|---|---|
| 90–100 | 🏆 Budget Master |
| 70–89 | 🌟 Smart Spender |
| 50–69 | 🙂 Getting By |
| 0–49 | 😬 Overspending |

The score is a **game-design mechanic, not a cited UK financial statistic**: it rewards saving a larger share of monthly take-home pay after food (saving 40% or more scores 100; saving nothing, or overspending, scores 0). The formula lives in `src/lib/financialHealth.ts` and is documented there.

Below the score, a **🤔 Could you make it work better?** reflection section offers jump-back buttons for every decision — career, housing, energy, transport, food, and savings. Jumping back to career/housing/energy/transport takes the player to that wizard step; picking a new option there returns straight to the Results summary (rather than continuing step by step) so experimenting with one choice doesn't mean re-answering the others. A **🔁 Play Again** button resets every choice and returns to Level 1.

### Code Structure

- `src/data/careers.ts` — career data (name, avatar, salary, source citation).
- `src/data/housing.ts` — housing option data (name, description, monthly cost, source citation).
- `src/data/food.ts` — food option data (name, description, monthly cost, source citation); used on the Results step, not its own wizard step.
- `src/data/utilities.ts` — utilities option data (name, description, monthly cost, source citation).
- `src/data/transport.ts` — transport option data (name, description, monthly cost, source citation).
- `src/data/savings.ts` — savings goal options (name, description, icon, percent of income); a game mechanic, so no source citation.
- `src/lib/payCalculations.ts` — income tax / National Insurance / take-home pay calculations, separate from UI.
- `src/lib/budgetCalculations.ts` — `calculateMoneyLeft` (income minus a list of costs) and `calculateSavingsAmount` (percent of income, rounded), separate from UI.
- `src/lib/financialHealth.ts` — Financial Health Score and feedback-tier logic, separate from UI.
- `src/lib/formatMoney.ts` — currency formatting helper.
- `src/lib/steps.ts` — the 5 wizard step definitions (id, title, icon).
- `src/components/CareerCard.tsx` — single reusable career card.
- `src/components/CareerSelector.tsx` — responsive grid of career cards.
- `src/components/HousingCard.tsx` — single reusable housing option card.
- `src/components/HousingSelector.tsx` — responsive grid of housing cards.
- `src/components/FoodCard.tsx` — single reusable food option card.
- `src/components/FoodSelector.tsx` — responsive grid of food cards (reused on the Results step).
- `src/components/UtilitiesCard.tsx` — single reusable utilities option card.
- `src/components/UtilitiesSelector.tsx` — responsive grid of utilities cards.
- `src/components/TransportCard.tsx` — single reusable transport option card.
- `src/components/TransportSelector.tsx` — responsive grid of transport cards.
- `src/components/SavingsCard.tsx` — single reusable savings option card, showing the £/month amount for the player's income.
- `src/components/SavingsSelector.tsx` — responsive grid of savings cards.
- `src/components/MoneyCheckBanner.tsx` — HUD-styled "money left / overspending" banner with a follow-up question, used on the food and savings stages of Results.
- `src/components/ReflectionPrompts.tsx` — the "Could you make it work better?" jump-back button grid shown on the Results summary.
- `src/components/BudgetHud.tsx` — game-HUD style income/housing/utilities/transport/food/savings/money-left-over display, shown only on the Results summary.
- `src/components/LevelChip.tsx` — `LEVEL X OF 5` badge.
- `src/components/XpProgressBar.tsx` — gradient fill bar showing step progress.
- `src/components/StepProgress.tsx` — HUD-styled container combining the Level Chip, step title, and XP Progress Bar.
- `src/components/StepHeading.tsx` — icon + title heading shown atop each step's content.
- `src/components/WizardNav.tsx` — Previous navigation button (moving forward happens automatically when an option is selected).
- `src/components/ResultsScreen.tsx` — the Results step's own food → savings → summary stage machine, rendering the budget HUD, Financial Health Score, reflection prompts, and Play Again button at the summary.
- `src/App.tsx` — wizard step state, selection state, step-by-step rendering, and jump-back-to-Results navigation.

## Planned Next Features

- Leisure choices (as an additional wizard step or a further Results follow-up question).
