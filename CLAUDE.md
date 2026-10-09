# Project Mission

We are building a financial education game for UK children aged 12-16.

The goal is to help young people understand:

- Income
- Spending
- Saving
- Budgeting
- Real-world financial trade-offs

The experience should feel like a game, not a finance lesson.

The player chooses a career, receives a salary, makes lifestyle choices, and sees how those decisions affect their monthly budget and savings.

The player should be encouraged to experiment and learn through gameplay.

---

# Core Product Principles

## Highest Priority

The app must:

1. Be fun.
2. Be interactive.
3. Be gameplay-driven.
4. Teach real financial concepts.
5. Use realistic UK financial data.
6. Allow users to change decisions repeatedly.
7. Show the consequences of choices immediately.
8. Make learning feel rewarding.

---

# MVP Philosophy

Keep the first version extremely simple.

DO NOT over-engineer.

DO NOT build future features before they are needed.

DO NOT add unnecessary frameworks, services, or infrastructure.

Focus only on proving that the learning experience works.

The first version only needs to satisfy the core requirements.

---

# Technology Stack

Keep the technology stack as simple as possible.

Preferred stack:

- TypeScript
- Tailwind CSS

Backend should remain optional.

Do not implement a backend, database, API, authentication, or server-side infrastructure unless it is absolutely necessary to satisfy an agreed product requirement.

Prefer frontend-only solutions with hardcoded TypeScript data for the MVP whenever possible.

Additional technologies should only be introduced if absolutely necessary.

Before adding any dependency ask:

"Can this be achieved with the existing stack?"

If yes, do not add the dependency.

---

# Product Requirements

The player chooses a career avatar.
Use the image files from the ./avatars folder.

Examples:

- Teacher
- Nurse
- Doctor
- Police Officer
- Plumber
- Lawyer
- Scientist
- Software Developer

Each career has a realistic UK starting salary.

The player receives a monthly income based on that salary.

The player then makes lifestyle decisions including:

- Housing
- Utilities
- Food
- Transport
- Communications
- Leisure
- Savings

The player's remaining monthly savings should update immediately after each decision.

The player can revisit decisions and see how different choices affect their finances.

The game must encourage experimentation.

There should never be a "single correct answer".

---

# Iterative Product Development

Build one feature at a time.

Always deliver the smallest useful version first.

Example order:

Phase 1

- Career selection
- Salary display
- Monthly take-home estimate

Phase 2

- Housing choices
- Savings calculation

Phase 3

- Utilities choices

Phase 4

- Food choices

Phase 5

- Transport choices

Phase 6

- Leisure choices

Only move to the next feature after the current feature works properly.

---

# Designer Collaboration

This product will evolve with designer input.

Structure code so that:

- UI can be easily changed.
- Career data can be edited easily.
- Visual layouts can be adjusted without rewriting business logic.
- Components remain small and reusable.

When building features:

- Separate styling from calculation logic.
- Keep screens simple.
- Avoid complex component hierarchies.

Always assume a designer will request changes.

Optimise for iteration speed.

---

# Data Rules

NEVER invent statistics.

NEVER fabricate financial data.

NEVER create fake UK cost figures.

All financial information must come from trusted published UK sources.

Examples:

- Office for National Statistics (ONS)
- GOV.UK
- MoneyHelper
- Bank of England
- FCA
- UK Parliament publications
- National Careers Service
- NHS
- Professional bodies
- Major UK utility providers

When using external data:

1. Find the source.
2. Cite the source.
3. Explain where the number came from.

If a trusted source cannot be found:

- Tell the user.
- Do not make up a number.

---

# Initial Data Strategy

Use hardcoded data first.

Do not build databases in early versions.

Do not add APIs in early versions.

Do not build admin systems.

Store data in simple TypeScript objects until there is a proven need for something more complex.

Example:

- Careers
- Salaries
- Housing options
- Utility options
- Food options

can all be hardcoded initially.

---

# UK Cost Guidance

Use realistic UK costs based on published data.

The MVP should primarily teach these spending categories:

1. Housing
2. Utilities
3. Food
4. Transport
5. Debt Repayments

These categories represent most household spending and provide the strongest educational value.

Additional categories should be added later.

Use realistic UK salary and cost data wherever available from trusted published UK sources.

The currently planned MVP careers are:

- Teacher (£32k)
- Nurse (£30k)
- Doctor (£38k)
- Police Officer (£29k)
- Plumber (£27k)
- Lawyer (£35k)
- Scientist (£30k)
- Software Developer (£32k)

These figures should always be validated against trusted published sources before implementation.

---

# Educational Principles

Every feature should answer at least one of these questions:

- Where does money come from?
- Where does money go?
- How much can I save?
- What happens when I spend more?
- What trade-offs do adults make?

If a feature does not improve learning, do not build it.

---

# UX Principles

The target audience is 12-16 year olds.

Therefore:

- Use simple language.
- Avoid financial jargon.
- Prefer visuals over text.
- Show cause and effect immediately.
- Use positive feedback.
- Make numbers easy to understand.

Every screen should answer:

"What happens if I choose this option?"

---

# Visual Identity

Money-Life Sim is a game, not a banking app.

The UI should feel like:

A life simulation game
A game HUD
Progression and achievement
Interactive and rewarding
The UI should NOT feel like:

A banking app
A spreadsheet
A school worksheet
A finance calculator
All screens should reinforce the feeling of building a life and progressing through a game.

---

# Development Rules

Build the simplest possible solution.

Avoid premature optimisation.

Keep files small.

Keep logic easy to understand.

Keep the first version focused on proving the concept.

When planning work:

- Build one feature at a time.
- Complete one user journey before starting another.
- Prefer hardcoded data over infrastructure.
- Prefer simple calculations over complex simulations.
- Prefer clarity over technical sophistication.

Always ensure the implementation meets all agreed product requirements before moving on to additional features.

---

# Completion Checklist

Before considering work complete, verify:

- The feature meets the stated requirement.
- The feature remains simple.
- The feature uses realistic UK data.
- No statistics were invented.
- The solution can be iterated upon later.

---

# README Requirements

Do not include application run instructions inside this CLAUDE.md file.

Instead:

- Maintain a comprehensive README.md.
- Keep README.md updated after every meaningful change.
- README.md must always contain:
  - Project purpose
  - Technology stack
  - Prerequisites
  - Installation instructions
  - Configuration instructions
  - Development commands
  - Build commands
  - Local run instructions
  - Application URL
  - Environment variables
  - Current implemented features
  - Planned next features

Whenever code changes are made, update README.md if required so another developer can immediately run and understand the application.
