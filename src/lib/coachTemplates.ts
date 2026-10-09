/**
 * Predefined templates for the Financial Coach shown on the Results screen.
 * This is a game-design mechanic, not real financial advice or AI-generated
 * text — the coach picks one of these fixed templates using simple rules
 * (money left over, and housing/transport/savings as a share of income).
 * There is no LLM call, no API call, and no backend involved.
 */

export type CoachTier = {
  id: string
  emoji: string
  title: string
  message: string
  tip: string
}

const OVERSPENDING_TIER: CoachTier = {
  id: 'overspending',
  emoji: '🚨',
  title: "You're Spending More Than You Earn",
  message:
    'Your current lifestyle costs more than your income. Try reducing housing, transport or food spending and see how your score changes.',
  tip: 'Experiment with different choices to find a more balanced lifestyle.',
}

const PAYCHECK_TO_PAYCHECK_TIER: CoachTier = {
  id: 'paycheck-to-paycheck',
  emoji: '⚠️',
  title: 'Living Paycheck to Paycheck',
  message: 'You can cover your expenses, but there is little room for unexpected costs.',
  tip: 'Try increasing your savings by reducing one lifestyle category.',
}

const GOOD_POSITION_TIER: CoachTier = {
  id: 'good-position',
  emoji: '✅',
  title: 'Good Financial Position',
  message: 'Your spending is under control and you still have money available for future goals.',
  tip: 'Consider building an emergency fund.',
}

const FUTURE_MONEY_MASTER_TIER: CoachTier = {
  id: 'future-money-master',
  emoji: '🏆',
  title: 'Future Money Master',
  message: 'You are saving a significant amount each month and have built a sustainable lifestyle.',
  tip: 'Consider splitting your spare money between savings and long-term goals.',
}

const PAYCHECK_TO_PAYCHECK_MAX = 200
const GOOD_POSITION_MAX = 750

export function getCoachTier(moneyLeftOver: number): CoachTier {
  if (moneyLeftOver < 0) return OVERSPENDING_TIER
  if (moneyLeftOver < PAYCHECK_TO_PAYCHECK_MAX) return PAYCHECK_TO_PAYCHECK_TIER
  if (moneyLeftOver < GOOD_POSITION_MAX) return GOOD_POSITION_TIER
  return FUTURE_MONEY_MASTER_TIER
}

const HOUSING_SHARE_WARNING_THRESHOLD = 0.4
const TRANSPORT_SHARE_WARNING_THRESHOLD = 0.15
const SAVINGS_SHARE_PRAISE_THRESHOLD = 0.2

type CoachObservationInputs = {
  monthlyIncome: number
  monthlyHousingCost: number
  monthlyTransportCost: number
  monthlySavings: number
}

export function getCoachObservations({
  monthlyIncome,
  monthlyHousingCost,
  monthlyTransportCost,
  monthlySavings,
}: CoachObservationInputs): string[] {
  if (monthlyIncome <= 0) return []

  const observations: string[] = []

  if (monthlyHousingCost / monthlyIncome > HOUSING_SHARE_WARNING_THRESHOLD) {
    observations.push('Your housing costs are taking a large share of your income.')
  }

  if (monthlyTransportCost / monthlyIncome > TRANSPORT_SHARE_WARNING_THRESHOLD) {
    observations.push('Transport spending is higher than recommended.')
  }

  if (monthlySavings / monthlyIncome > SAVINGS_SHARE_PRAISE_THRESHOLD) {
    observations.push('Great job following the spirit of the 50/30/20 rule.')
  }

  return observations
}
