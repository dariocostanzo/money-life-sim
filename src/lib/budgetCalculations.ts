export function calculateMoneyLeft(monthlyIncome: number, costs: number[]): number {
  return costs.reduce((remaining, cost) => remaining - cost, monthlyIncome)
}

/**
 * Scales a base UK cost figure by a location's cost-of-living multiplier, so
 * housing/utilities/transport/food costs vary by region the same way pay does.
 */
export function applyLocationMultiplier(baseCost: number, multiplier: number): number {
  return Math.round(baseCost * multiplier)
}

export function calculateSavingsAmount(monthlyIncome: number, percentOfIncome: number): number {
  return Math.max(0, Math.round(monthlyIncome * percentOfIncome))
}
