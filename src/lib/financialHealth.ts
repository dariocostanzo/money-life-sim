/**
 * Financial Health Score is a game-design mechanic to make budgeting feel
 * rewarding, not a cited UK financial benchmark. It scores how much of their
 * monthly income the player kept as savings: saving 40% or more of take-home
 * pay scores 100, saving nothing (or overspending) scores 0.
 */
const TARGET_SAVINGS_RATE = 0.4

export function calculateFinancialHealthScore(monthlyIncome: number, moneyLeftToSave: number): number {
  if (monthlyIncome <= 0) return 0

  const savingsRate = moneyLeftToSave / monthlyIncome
  const score = (savingsRate / TARGET_SAVINGS_RATE) * 100

  return Math.round(Math.min(100, Math.max(0, score)))
}

export type FinancialHealthFeedback = {
  label: string
  emoji: string
  message: string
}

export function getFinancialHealthFeedback(score: number): FinancialHealthFeedback {
  if (score >= 90) {
    return {
      label: 'Budget Master',
      emoji: '🏆',
      message: "Amazing! You're saving loads while covering everything you need.",
    }
  }

  if (score >= 70) {
    return {
      label: 'Smart Spender',
      emoji: '🌟',
      message: "Nice work! You're balancing your spending and still saving well.",
    }
  }

  if (score >= 50) {
    return {
      label: 'Getting By',
      emoji: '🙂',
      message: "You're covering your costs, but there's not much left to save. Try a cheaper choice somewhere!",
    }
  }

  return {
    label: 'Overspending',
    emoji: '😬',
    message: 'Your costs are eating up your income. Go back and try some cheaper choices!',
  }
}
