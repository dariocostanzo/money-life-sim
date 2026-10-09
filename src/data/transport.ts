export type TransportOption = {
  id: string
  name: string
  description: string
  icon: string
  monthlyCost: number
  /** Where the monthlyCost figure came from, for transparency to players/parents/teachers. */
  source: string
}

/**
 * Real UK transport cost figures from published, trusted sources (see each `source` field).
 * Do not replace with invented numbers.
 */
export const transportOptions: TransportOption[] = [
  {
    id: 'walk-cycle',
    name: 'Walk / Cycle',
    description: 'Get around on foot or by bike, with the odd bit of bike upkeep.',
    icon: '🚲',
    monthlyCost: 10,
    source:
      'Cycling UK, typical bicycle service cost of £50-£200 per year (using the lower end for light upkeep) - cyclinguk.org/article/how-much-money-can-you-save-cycling',
  },
  {
    id: 'public-transport',
    name: 'Public Transport',
    description: 'Get a monthly bus and tram pass to travel around.',
    icon: '🚌',
    monthlyCost: 95,
    source: 'Transport for London, adult Monthly Bus & Tram Pass price - tfl.gov.uk/fares/find-fares/bus-and-tram-fares',
  },
  {
    id: 'car',
    name: 'Car',
    description: 'Run your own car, covering fuel, insurance, tax, and servicing.',
    icon: '🚗',
    monthlyCost: 284,
    source:
      'RAC Report on Motoring 2025, average annual cost of running a car excluding finance and depreciation, £3,407/year - rac.co.uk/report-on-motoring',
  },
]
