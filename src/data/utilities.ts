export type UtilitiesOption = {
  id: string
  name: string
  description: string
  icon: string
  monthlyCost: number
  /** Where the monthlyCost figure came from, for transparency to players/parents/teachers. */
  source: string
}

/**
 * Real UK utilities (gas and electricity) cost figures from published, trusted sources
 * (see each `source` field). Do not replace with invented numbers.
 */
export const utilitiesOptions: UtilitiesOption[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'A small flat with careful, low energy use.',
    icon: '🔋',
    monthlyCost: 106,
    source:
      'Ofgem Typical Domestic Consumption Values, "low" usage household (1,800 kWh electricity, 7,500 kWh gas per year), under the October to December 2025 energy price cap (£1,266/year) - ofgem.gov.uk',
  },
  {
    id: 'average',
    name: 'Average',
    description: "A typical home's usual heating, lighting, and appliances.",
    icon: '⚡',
    monthlyCost: 146,
    source:
      'Ofgem Typical Domestic Consumption Values, "medium" (typical) usage household (2,700 kWh electricity, 11,500 kWh gas per year), under the October to December 2025 energy price cap (£1,755/year) - ofgem.gov.uk',
  },
  {
    id: 'high-usage',
    name: 'High Usage',
    description: 'Lots of heating, appliances, and electronics running often.',
    icon: '🔥',
    monthlyCost: 206,
    source:
      'Ofgem Typical Domestic Consumption Values, "high" usage household (4,100 kWh electricity, 17,000 kWh gas per year), under the October to December 2025 energy price cap (£2,470/year) - ofgem.gov.uk',
  },
]
