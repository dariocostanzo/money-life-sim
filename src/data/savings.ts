export type SavingsOption = {
  id: string
  name: string
  description: string
  icon: string
  percentOfIncome: number
}

/**
 * Savings goals the player chooses between — a game mechanic, not a cited
 * UK statistic, so there's no `source` field here (unlike housing/food/
 * utilities/transport options).
 */
export const savingsOptions: SavingsOption[] = [
  {
    id: 'none',
    name: 'No Savings',
    description: 'Spend everything that is left over.',
    icon: '🙅',
    percentOfIncome: 0,
  },
  {
    id: 'five-percent',
    name: '5%',
    description: 'Save a small slice of your take-home pay.',
    icon: '🐷',
    percentOfIncome: 0.05,
  },
  {
    id: 'ten-percent',
    name: '10%',
    description: 'Save a steady chunk every month.',
    icon: '🐷',
    percentOfIncome: 0.1,
  },
  {
    id: 'fifteen-percent',
    name: '15%',
    description: 'Save a bigger share of your pay.',
    icon: '🐷',
    percentOfIncome: 0.15,
  },
  {
    id: 'twenty-percent',
    name: '20%+',
    description: 'Save as much as you can each month.',
    icon: '🐷',
    percentOfIncome: 0.2,
  },
]
