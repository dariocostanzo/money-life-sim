export function calculateMoneyLeft(monthlyIncome: number, costs: number[]): number {
  return costs.reduce((remaining, cost) => remaining - cost, monthlyIncome)
}

export function calculateSavingsAmount(monthlyIncome: number, percentOfIncome: number): number {
  return Math.max(0, Math.round(monthlyIncome * percentOfIncome))
}
