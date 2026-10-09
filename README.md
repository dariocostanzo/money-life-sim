# Money Life Sim

## Project Purpose

Money Life Sim is a financial education game for UK children aged 12-16. Players progress through a 7-level game flow — Career, Location, Your Pay, Housing, Utilities, Transport, and Results — making lifestyle decisions and watching a budget HUD come together, to learn about income, spending, saving, budgeting, and real-world financial trade-offs, all through gameplay rather than a finance lesson. The player picks a career and then a work location before their pay is revealed, because take-home pay depends on both choices together. At the Results step, the game springs two follow-up questions on the player — "What about food?" and "What about savings?" — before showing the final picture, because it's easy to forget everyday costs and to treat savings as an afterthought rather than a planned outgoing.

## Technology Stack

- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (dev server and build tool)
- [qrcode.react](https://www.npmjs.com/package/qrcode.react) — renders the desktop QR code as an SVG entirely client-side, no network calls needed

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

### Landing Page

Before the wizard starts, players see a landing screen (`src/components/LandingScreen.tsx`) with the Money Life Sim logo (`src/assets/logo/logo.png`), the game title, a one-line pitch, and a big **▶️ Start** button. The wizard, progress HUD, and header don't render until the player taps Start — the desktop QR code badge is still shown here too, so a player watching on a projector can scan it before the game even begins.

### Game Flow: Multi-Step Wizard

The app is a 7-level stepper, not a scrolling page — only one step is ever on screen at a time:

1. **Choose Your Career**
2. **Choose Where You'll Work**
3. **Your Pay** (reveal)
4. **Choose Where You'll Live**
5. **Choose Your Energy Usage**
6. **Choose How You'll Get Around**
7. **Your Results** (which also asks "What about food?" and "What about savings?")

Every step shows a game-HUD style progress bar at the top: a **Level Chip** (`LEVEL X OF 7`) and an **XP Progress Bar** that fills in as the player advances. Selecting an option **automatically advances** to the next step — there is no manual Next button (the homescreen has no Previous button either, since there's nowhere to go back to). A **Previous** button on every later step lets players go back and reconsider an earlier choice at any time, and their prior selections persist. The running budget HUD is only shown once the Results step reaches its final summary, where the whole picture comes together.

### Phase 1: Career Selection

- Player selects a career from a grid of responsive, colourful cards.
- Each card shows only the career avatar and career name — no salary figure is shown here, since annual salary depends on both the career and the work location chosen next.
- Picking a career automatically advances to the next step.
- Players can go back and change their selection at any time.

**Careers included:** Teacher, Nurse, Doctor, Police Officer, Plumber, Lawyer, Scientist, Software Developer.

**Data sources for salary figures** (see `src/data/careers.ts` for per-career citations):
- [Get Into Teaching (Department for Education)](https://getintoteaching.education.gov.uk/life-as-a-teacher/pay-and-benefits/teacher-pay) — Teacher
- [NHS Employers, Agenda for Change pay scales](https://www.nhsemployers.org/articles/pay-scales-202526) — Nurse
- [NHS Health Careers](https://www.healthcareers.nhs.uk/explore-roles/doctors/pay-doctors) — Doctor
- [Police Remuneration Review Body 2025 report (GOV.UK)](https://www.gov.uk/government/publications/police-remuneration-review-body-report-2025-england-and-wales) — Police Officer
- [National Careers Service](https://nationalcareers.service.gov.uk/) — Plumber, Lawyer, Scientist, Software Developer

### Phase 1b: Location Choice and Pay Reveal

- After picking a career, the player picks a work location from six UK regions: London, South East, South West, Midlands, North West, North East.
- Each region applies a single cost-of-living multiplier (London highest at 140%, North East lowest at 90%) — see `src/data/locations.ts`. This multiplier scales **both sides of the budget**: the career's base annual salary, and every monthly living cost the player picks afterwards (housing, utilities, transport, and food, via `applyLocationMultiplier` in `src/lib/budgetCalculations.ts`). So choosing London doesn't just mean higher pay — rent, bills, travel, and groceries all cost more there too, the same way choosing the North East means lower pay but cheaper living costs. Annual salary is only ever calculated — and shown — once both career and location are known.
- Once both career and location are chosen, a **Your Pay** screen reveals the adjusted annual salary and the estimated monthly take-home pay together, before the player moves on to lifestyle choices. It also flags whether the chosen region's cost of living is higher, lower, or typical, so the player knows what to expect from the next few steps.
- The same screen breaks down where the difference between gross pay and take-home pay goes: a monthly Gross Pay, Income Tax, National Insurance, and Take-Home Pay line-up, plus a plain-language explanation that these deductions fund things like the NHS, schools, and roads.
- Players can go back and change either their career or their location at any time, which recalculates pay, the deduction breakdown, and every living cost shown in later steps.

**Take-home pay calculation** uses the published 2025/26 UK Income Tax and National Insurance rates and thresholds from [GOV.UK Income Tax rates](https://www.gov.uk/income-tax-rates) and [GOV.UK rates and thresholds for employers 2025 to 2026](https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026). The calculation (`src/lib/payCalculations.ts`) is simplified for an educational game: it assumes a standard tax code with no pension contributions, student loan repayments, or other deductions.

### Phase 2: Housing Choices

- Once a career is selected, the player picks where to live from three housing options.
- Each housing card shows the monthly cost, scaled by the chosen location's cost-of-living multiplier.
- Picking an option automatically advances to the next step; players can go back and change it at any time.

**Housing options included:** Live with Family, Shared Accommodation, One-Bedroom Flat.

**Data sources for housing cost figures** (see `src/data/housing.ts` for per-option citations):
- [Compare the Market survey of UK parents](https://www.comparethemarket.com/home-insurance/content/how-much-rent-do-parents-charge/) (May 2023) — Live with Family
- [SpareRoom Rental Index](https://www.spareroom.co.uk/content/info-landlords/rentalindex/), UK average room rent, Q3 2025 — Shared Accommodation
- [ONS Private Rent and House Prices, UK](https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/privaterentandhousepricesuk/november2025), average rent for a one-bedroom property, November 2025 — One-Bedroom Flat

### Phase 3: Utilities Choices

- Once a career is selected, the player also picks an energy usage level from three options: Basic, Average, High Usage.
- Each utilities card shows the monthly cost, scaled by the chosen location's cost-of-living multiplier.
- Picking an option automatically advances to the next step; players can go back and change it at any time.

**Utilities options included:** Basic, Average, High Usage.

**Data sources for utilities cost figures** (see `src/data/utilities.ts` for per-option citations):
- [Ofgem Typical Domestic Consumption Values](https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges), "low" usage household under the October to December 2025 energy price cap — Basic
- [Ofgem Typical Domestic Consumption Values](https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges), "medium" (typical) usage household under the October to December 2025 energy price cap — Average
- [Ofgem Typical Domestic Consumption Values](https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges), "high" usage household under the October to December 2025 energy price cap — High Usage

### Phase 4: Transport Choices

- Once a career is selected, the player also picks how they get around from three options: Walk / Cycle, Public Transport, Car.
- Each transport card shows the monthly cost, scaled by the chosen location's cost-of-living multiplier.
- Picking an option automatically advances to the Results step; players can go back and change it at any time.

**Transport options included:** Walk / Cycle, Public Transport, Car.

**Data sources for transport cost figures** (see `src/data/transport.ts` for per-option citations):
- [Cycling UK](https://www.cyclinguk.org/article/how-much-money-can-you-save-cycling), typical bicycle service cost — Walk / Cycle
- [Transport for London](https://tfl.gov.uk/fares/find-fares/bus-and-tram-fares), adult Monthly Bus & Tram Pass price — Public Transport
- [RAC Report on Motoring 2025](https://www.rac.co.uk/report-on-motoring), average annual cost of running a car excluding finance and depreciation — Car

### Results Step: "What about food?", "What about savings?", and the Financial Health Score

The Results step doesn't just dump a summary on the player — it walks through two follow-up questions first, each shown on its own screen with a running "money left so far" banner:

1. **🤔 But what about food?** — the player sees how much is left after housing, utilities, and transport, then picks a food budget from the same three options used elsewhere in the game: Budget, Typical, Premium (see `src/data/food.ts` for sourced monthly costs — [GOV.UK Family Food FYE 2025](https://www.gov.uk/government/statistics/family-food-fye-2025/family-food-fye-2025) for Budget, [Loughborough University Minimum Income Standard (MIS) 2024 Rebase](https://www.lboro.ac.uk/research/crsp/minimum-income-standard/) for Typical and Premium), also scaled by the chosen location's cost-of-living multiplier.
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

Below the score, a **🤔 Could you make it work better?** reflection section offers jump-back buttons for every decision — career, location, housing, energy, transport, food, and savings. Jumping back to career/location/housing/energy/transport takes the player to that wizard step; picking a new option there returns straight to the Results summary (rather than continuing step by step) so experimenting with one choice doesn't mean re-answering the others. A **🔁 Play Again** button resets every choice and returns to Level 1.

### Code Structure

- `src/data/careers.ts` — career data (name, avatar, salary, source citation).
- `src/data/locations.ts` — work location data (name, description, icon, cost-of-living multiplier, source note); the multiplier is applied to pay and to every living cost.
- `src/data/housing.ts` — housing option data (name, description, **base** monthly cost before the location multiplier, source citation).
- `src/data/food.ts` — food option data (name, description, **base** monthly cost before the location multiplier, source citation); used on the Results step, not its own wizard step.
- `src/data/utilities.ts` — utilities option data (name, description, **base** monthly cost before the location multiplier, source citation).
- `src/data/transport.ts` — transport option data (name, description, **base** monthly cost before the location multiplier, source citation).
- `src/data/savings.ts` — savings goal options (name, description, icon, percent of income); a game mechanic, so no source citation.
- `src/lib/payCalculations.ts` — income tax / National Insurance / take-home pay calculations, including the `calculatePayBreakdown` helper used by the Your Pay screen, separate from UI.
- `src/lib/budgetCalculations.ts` — `calculateMoneyLeft` (income minus a list of costs), `calculateSavingsAmount` (percent of income, rounded), and `applyLocationMultiplier` (scales a base cost by the chosen location's multiplier, used for housing/utilities/transport/food), separate from UI.
- `src/lib/financialHealth.ts` — Financial Health Score and feedback-tier logic, separate from UI.
- `src/lib/formatMoney.ts` — currency formatting helper.
- `src/lib/steps.ts` — the 7 wizard step definitions (id, title, icon).
- `src/components/CareerCard.tsx` — single reusable career card (avatar and name only, no salary), compact on phones (2-column grid, smaller avatar).
- `src/components/CareerSelector.tsx` — responsive grid of career cards.
- `src/components/ChoiceCard.tsx` — the one shared option card used by Location, Housing, Utilities, Transport, Food, and Savings. A horizontal, thumb-friendly row on phones; the original vertical card from `sm:` up. Changing the look of any option grid starts here.
- `src/components/LocationSelector.tsx` — responsive grid of location cards (built on `ChoiceCard`, no cost amount).
- `src/components/PayReveal.tsx` — the "Your Pay" screen showing adjusted annual salary, monthly take-home, and a Gross Pay / Income Tax / National Insurance / Take-Home Pay breakdown once career and location are both chosen.
- `src/components/HousingSelector.tsx` — responsive grid of housing cards (built on `ChoiceCard`).
- `src/components/FoodSelector.tsx` — responsive grid of food cards (built on `ChoiceCard`, reused on the Results step).
- `src/components/UtilitiesSelector.tsx` — responsive grid of utilities cards (built on `ChoiceCard`).
- `src/components/TransportSelector.tsx` — responsive grid of transport cards (built on `ChoiceCard`).
- `src/components/SavingsSelector.tsx` — responsive grid of savings cards (built on `ChoiceCard`), showing the £/month amount for the player's income.
- `src/components/MoneyCheckBanner.tsx` — HUD-styled "money left / overspending" banner with a follow-up question, used on the food and savings stages of Results.
- `src/components/ReflectionPrompts.tsx` — the "Could you make it work better?" jump-back button grid shown on the Results summary.
- `src/components/BudgetHud.tsx` — game-HUD style income/housing/utilities/transport/food/savings/money-left-over display, shown only on the Results summary.
- `src/components/LevelChip.tsx` — `LEVEL X OF 7` badge.
- `src/components/XpProgressBar.tsx` — gradient fill bar showing step progress.
- `src/components/StepProgress.tsx` — HUD-styled container combining the Level Chip, step title, and XP Progress Bar; sticky to the top of the screen so it's always visible while scrolling.
- `src/components/StepHeading.tsx` — icon + title heading shown atop each step's content.
- `src/components/WizardNav.tsx` — Previous navigation button (moving forward happens automatically when an option is selected); full width and thumb-sized on phones.
- `src/components/ResultsScreen.tsx` — the Results step's own food → savings → summary stage machine, rendering the budget HUD, Financial Health Score, reflection prompts, and Play Again button at the summary.
- `src/components/QrCodeBadge.tsx` — the floating QR code shown only on desktop-width screens, linking to the live demo URL.
- `src/components/LandingScreen.tsx` — the pre-wizard landing page: logo, title, pitch, and the Start button.
- `src/App.tsx` — the `hasStarted` landing-page gate, wizard step state, selection state, step-by-step rendering, and jump-back-to-Results navigation.

## Mobile-First Design & Demo Mode

The app is designed to be played on a phone, since at a hackathon the audience scans a QR code and plays along live:

- **Phone-first layout.** Supports widths from 320px up with no horizontal scrolling. The career grid is 2 columns on phones; every other option list (location, housing, utilities, transport, food, savings) uses `ChoiceCard`'s compact horizontal row layout, with the icon, name, description and cost all on one tappable row, so 3–6 options fit on a single phone screen without scrolling past them.
- **One step fills the screen.** The Level Chip and XP Progress Bar (`StepProgress`) stick to the top of the screen as the player scrolls, so progress is always visible. The page scrolls back to the top automatically every time a step (or a Results sub-stage) changes, so the next step always opens at the top rather than wherever the previous step left off.
- **Thumb-friendly and fast.** Every button — Previous, Continue, Play Again, the reflection jump-back buttons — is at least 44–52px tall on phones and gives a quick tap animation (`active:scale-95`). Picking an option advances to the next step after 300ms, just long enough to see the selection highlight.
- **Demo-ready contrast and text size.** Coloured HUD and card boxes use darker shades (`-600` instead of `-500`) so white text stays readable on a projector, and body/label text sizes are bumped up a step from the original desktop sizes.

## QR Code

On desktop-width screens (`lg:` and up) only, a floating card in the bottom-right corner (`src/components/QrCodeBadge.tsx`) shows a QR code linking to the live demo at `money-life-sim.vercel.app`, so an audience watching on a projector can scan it and play along on their own phones. It's hidden on phone widths, since a phone player doesn't need to scan a code to reach the page they're already on.

## Animations

A handful of light, CSS-only animations (`tailwind.config.js` `keyframes`/`animation`) give the game some life without costing performance on phones or desktop:

- **Card entrance** (`animate-fade-in-up`) — option cards and step headings fade and slide in slightly as each step appears, staggered a few milliseconds apart by grid position so a step's cards arrive like a ripple rather than all at once.
- **Checkmark pop** (`animate-pop-in`) — the green ✓ badge on a selected card, and the Financial Health Score number, pop in with a small overshoot for a satisfying "selected" feel.
- **Landing logo float** (`motion-safe:animate-float`) — the logo on the landing page gently bobs up and down, a handful of times, then settles.
- **Start button pulse** (`motion-safe:animate-pulse-soft`) — the landing page's Start button breathes subtly a few times to draw the eye, then stops.

All of these animate only `transform` and `opacity` — properties the browser can run on the GPU compositor without re-running page layout — so they don't add any measurable CPU/rendering cost, and they're one-shot (not a looping render loop in JavaScript). The two landing-page animations run for a finite number of iterations (not forever — see WCAG 2.2.2 in the Accessibility section below) and only play at all under `motion-safe:`, i.e. when the player hasn't asked their OS for reduced motion. Every animation also respects `prefers-reduced-motion: reduce` (see `src/index.css`), which disables all animations, transitions, and animation delays site-wide.

## Accessibility

The app has been audited and fixed against WCAG 2.1 AA issues:

- **No skipped or doubled steps.** Rapidly double-clicking or double-tapping an option card used to be able to skip a wizard step (e.g. landing on Pay before a location was chosen) or silently skip a cost category. Selections now debounce correctly (`src/App.tsx` and `src/components/ResultsScreen.tsx`), so a second click within the advance window is ignored rather than queued.
- **Focus follows the game.** Every step and every Results sub-stage (food/savings/summary) moves keyboard focus to its heading when it appears, instead of leaving focus on a button that no longer exists (`StepHeading.tsx`, `MoneyCheckBanner.tsx`). A visually hidden `aria-live="polite"` region in `App.tsx` also announces the level and step title for screen reader users on every step change.
- **Colour contrast.** The coloured price tiles on option cards and the budget summary tiles were white text on `-500`/`-600` background shades, several of which fell below the 4.5:1 ratio WCAG AA requires for normal-size text. They're now `-700` shades, and small labels use solid white instead of `white/80`.
- **Proper landmarks and headings.** The app has a `<main>` landmark on both the landing page and the wizard, the QR code is an `<aside>`, and heading levels no longer skip or duplicate (the Results food/savings questions are real `<h2>`s; card names use `<span>`, not `<h3>`, since headings aren't valid inside a `<button>`).
- **Meaningful names, not raw emoji.** Decorative emoji (💰, 🏠, ✓ badges, button icons, etc.) are wrapped in `aria-hidden="true"` so screen readers announce button and heading names in plain English instead of "money bag" or "check mark". Mobile-only text (like "Monthly Cost") uses `sr-only sm:not-sr-only` instead of `hidden sm:block`, so it's still announced even when visually hidden on small screens.
- **No infinite motion.** The landing page's looping animations (logo float, Start button pulse) now run a finite number of times instead of forever (WCAG 2.2.2), and only play under `motion-safe:` in the first place.
- **Keyboard and focus-ring support.** Every interactive element has a visible `focus-visible` ring, and `scroll-padding-top`/`scroll-padding-bottom` in `src/index.css` stop a keyboard-focused card from landing underneath the sticky progress bar or the fixed QR badge.
- **Other fixes:** the progress bar announces what it's tracking (`aria-label`/`aria-valuetext`, not just a bare percentage); the Financial Health Score shows "/100"; the budget summary uses a `<dl>` of label/value pairs instead of unstructured `<div>`s; decorative images (the logo, career avatars) use `alt=""` instead of alt text that just repeats the visible name next to them; the page's `lang` is `en-GB`; and the document `<title>` updates with the current step.

## Planned Next Features

- Leisure choices (as an additional wizard step or a further Results follow-up question).
