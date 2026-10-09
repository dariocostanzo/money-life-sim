export type FoodOption = {
  id: string
  name: string
  description: string
  icon: string
  monthlyCost: number
  /** Where the monthlyCost figure came from, for transparency to players/parents/teachers. */
  source: string
}

/**
 * Real UK food cost figures from published, trusted sources (see each `source` field).
 * Do not replace with invented numbers.
 */
export const foodOptions: FoodOption[] = [
  {
    id: 'budget',
    name: 'Budget',
    description: 'Simple meals and own-brand groceries to keep costs low.',
    icon: '🥣',
    monthlyCost: 146,
    source:
      'GOV.UK Family Food FYE 2025, UK average spend on food and non-alcoholic drinks for home consumption, £33.63 per person per week - gov.uk/government/statistics/family-food-fye-2025',
  },
  {
    id: 'typical',
    name: 'Typical',
    description: 'A balanced weekly shop with a good variety of food.',
    icon: '🍽️',
    monthlyCost: 321,
    source:
      'Loughborough University Minimum Income Standard (MIS) 2024 Rebase, weekly food budget for a single working-age adult, £73.99 per week - lboro.ac.uk/research/crsp/minimum-income-standard',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Quality groceries plus the occasional takeaway or meal out.',
    icon: '🍔',
    monthlyCost: 367,
    source:
      'Loughborough University Minimum Income Standard (MIS) 2024 Rebase, weekly food and catering budget (including takeaways/eating out) for a single working-age adult, £84.75 per week - lboro.ac.uk/research/crsp/minimum-income-standard',
  },
]
