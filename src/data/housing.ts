export type HousingOption = {
  id: string
  name: string
  description: string
  icon: string
  monthlyCost: number
  /** Where the monthlyCost figure came from, for transparency to players/parents/teachers. */
  source: string
}

/**
 * Real UK housing cost figures from published, trusted sources (see each `source` field).
 * Do not replace with invented numbers.
 */
export const housingOptions: HousingOption[] = [
  {
    id: 'live-with-family',
    name: 'Live with Family',
    description: 'Stay at home and give your family some money towards bills.',
    icon: '🏡',
    monthlyCost: 111,
    source:
      'Compare the Market survey of UK parents with adult children (18+) living at home, average weekly contribution £25.55 (May 2023) - comparethemarket.com',
  },
  {
    id: 'shared-accommodation',
    name: 'Shared Accommodation',
    description: 'Rent a room in a shared house with other people.',
    icon: '🛏️',
    monthlyCost: 753,
    source: 'SpareRoom Rental Index, UK average room rent, Q3 2025 - spareroom.co.uk',
  },
  {
    id: 'one-bedroom-flat',
    name: 'One-Bedroom Flat',
    description: 'Rent your own one-bedroom flat, all to yourself.',
    icon: '🏢',
    monthlyCost: 1107,
    source: 'ONS Private Rent and House Prices, UK average rent for a one-bedroom property, November 2025 - ons.gov.uk',
  },
]
