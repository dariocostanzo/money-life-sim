export type Location = {
  id: string
  name: string
  icon: string
  description: string
  /**
   * Regional cost-of-living multiplier. Applied to a career's base annual
   * salary (higher pay in expensive regions), and to every monthly living
   * cost — housing, utilities, transport, and food — so the higher pay in
   * places like London is matched by higher living costs, not just banked
   * as extra savings.
   */
  multiplier: number
  source: string
}

export const locations: Location[] = [
  {
    id: 'london',
    name: 'London',
    icon: '🏙️',
    description: 'The capital city, with the highest pay but also the highest cost of living.',
    multiplier: 1.4,
    source: 'Regional cost-of-living multiplier supplied for Money Life Sim, applied to pay and to every living cost.',
  },
  {
    id: 'south-east',
    name: 'South East',
    icon: '🌳',
    description: 'Towns and cities surrounding London.',
    multiplier: 1.2,
    source: 'Regional cost-of-living multiplier supplied for Money Life Sim, applied to pay and to every living cost.',
  },
  {
    id: 'south-west',
    name: 'South West',
    icon: '🌊',
    description: 'Coastal and countryside areas in the south west of England.',
    multiplier: 1.05,
    source: 'Regional cost-of-living multiplier supplied for Money Life Sim, applied to pay and to every living cost.',
  },
  {
    id: 'midlands',
    name: 'Midlands',
    icon: '🏘️',
    description: 'The heart of England, with typical UK pay levels.',
    multiplier: 1.0,
    source: 'Regional cost-of-living multiplier supplied for Money Life Sim, applied to pay and to every living cost.',
  },
  {
    id: 'north-west',
    name: 'North West',
    icon: '🏭',
    description: 'Cities and towns in the north west of England.',
    multiplier: 0.95,
    source: 'Regional cost-of-living multiplier supplied for Money Life Sim, applied to pay and to every living cost.',
  },
  {
    id: 'north-east',
    name: 'North East',
    icon: '⛰️',
    description: 'The north easternmost region of England.',
    multiplier: 0.9,
    source: 'Regional cost-of-living multiplier supplied for Money Life Sim, applied to pay and to every living cost.',
  },
]
