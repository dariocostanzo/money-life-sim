import { useState } from 'react'
import { foodOptions } from '../data/food'
import { savingsOptions } from '../data/savings'
import { calculateMoneyLeft, calculateSavingsAmount } from '../lib/budgetCalculations'
import { calculateFinancialHealthScore, getFinancialHealthFeedback } from '../lib/financialHealth'
import { formatGBP } from '../lib/formatMoney'
import type { StepId } from '../lib/steps'
import { BudgetHud } from './BudgetHud'
import { FoodSelector } from './FoodSelector'
import { MoneyCheckBanner } from './MoneyCheckBanner'
import { ReflectionPrompts } from './ReflectionPrompts'
import { SavingsSelector } from './SavingsSelector'
import { StepHeading } from './StepHeading'

/** Gives the player a moment to see a card highlight before the stage changes. */
const ADVANCE_DELAY_MS = 450

type ResultsStage = 'food' | 'savings' | 'summary'

type ResultsScreenProps = {
  monthlyIncome: number
  monthlyHousingCost: number
  monthlyUtilitiesCost: number
  monthlyTransportCost: number
  selectedFoodId: string | null
  onSelectFood: (foodId: string) => void
  selectedSavingsId: string | null
  onSelectSavings: (savingsId: string) => void
  onJumpToStep: (stepId: StepId) => void
  onRestart: () => void
}

export function ResultsScreen({
  monthlyIncome,
  monthlyHousingCost,
  monthlyUtilitiesCost,
  monthlyTransportCost,
  selectedFoodId,
  onSelectFood,
  selectedSavingsId,
  onSelectSavings,
  onJumpToStep,
  onRestart,
}: ResultsScreenProps) {
  const [stage, setStage] = useState<ResultsStage>(
    selectedFoodId && selectedSavingsId ? 'summary' : 'food',
  )

  const selectedFood = foodOptions.find((option) => option.id === selectedFoodId) ?? null
  const selectedSavings = savingsOptions.find((option) => option.id === selectedSavingsId) ?? null

  const monthlyFoodCost = selectedFood?.monthlyCost ?? 0
  const monthlySavings = selectedSavings ? calculateSavingsAmount(monthlyIncome, selectedSavings.percentOfIncome) : 0

  const moneyLeftAfterEssentials = calculateMoneyLeft(monthlyIncome, [
    monthlyHousingCost,
    monthlyUtilitiesCost,
    monthlyTransportCost,
  ])
  const moneyLeftAfterFood = calculateMoneyLeft(monthlyIncome, [
    monthlyHousingCost,
    monthlyUtilitiesCost,
    monthlyTransportCost,
    monthlyFoodCost,
  ])
  const moneyLeftOver = moneyLeftAfterFood - monthlySavings

  function handleSelectFood(foodId: string) {
    onSelectFood(foodId)
    setTimeout(() => setStage(selectedSavingsId ? 'summary' : 'savings'), ADVANCE_DELAY_MS)
  }

  function handleSelectSavings(savingsId: string) {
    onSelectSavings(savingsId)
    setTimeout(() => setStage('summary'), ADVANCE_DELAY_MS)
  }

  if (stage === 'food') {
    return (
      <div>
        <MoneyCheckBanner moneyLeft={moneyLeftAfterEssentials} question="🤔 But what about food?" />
        <FoodSelector selectedFoodId={selectedFoodId} onSelectFood={handleSelectFood} />
      </div>
    )
  }

  if (stage === 'savings') {
    return (
      <div>
        <MoneyCheckBanner moneyLeft={moneyLeftAfterFood} question="💰 What about savings?" />
        <SavingsSelector
          monthlyIncome={monthlyIncome}
          selectedSavingsId={selectedSavingsId}
          onSelectSavings={handleSelectSavings}
        />
      </div>
    )
  }

  const score = calculateFinancialHealthScore(monthlyIncome, moneyLeftAfterFood)
  const feedback = getFinancialHealthFeedback(score)
  const isShort = moneyLeftOver < 0

  return (
    <div>
      <StepHeading icon="🏆" title="Your Results" />

      <p className="mb-6 text-center text-xl font-extrabold sm:text-2xl">
        {isShort ? (
          <span className="text-orange-600">⚠️ You're overspending by {formatGBP(Math.abs(moneyLeftOver))} a month.</span>
        ) : (
          <span className="text-green-600">✅ You have {formatGBP(moneyLeftOver)} left over every month!</span>
        )}
      </p>

      <BudgetHud
        monthlyIncome={monthlyIncome}
        monthlyHousingCost={monthlyHousingCost}
        monthlyUtilitiesCost={monthlyUtilitiesCost}
        monthlyTransportCost={monthlyTransportCost}
        monthlyFoodCost={monthlyFoodCost}
        monthlySavings={monthlySavings}
        moneyLeftOver={moneyLeftOver}
      />

      <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 rounded-3xl border-4 border-yellow-400 bg-gradient-to-b from-yellow-50 to-orange-100 p-6 text-center shadow-xl">
        <p className="text-sm font-bold uppercase tracking-wide text-indigo-700">Financial Health Score</p>
        <p className="text-6xl font-extrabold text-indigo-900">{score}</p>
        <p className="text-2xl font-extrabold text-indigo-900">
          {feedback.emoji} {feedback.label}
        </p>
        <p className="text-base text-indigo-700">{feedback.message}</p>
      </div>

      <ReflectionPrompts
        prompts={[
          { label: 'Try another career', icon: '💼', onClick: () => onJumpToStep('career') },
          { label: 'Change housing', icon: '🏠', onClick: () => onJumpToStep('housing') },
          { label: 'Change energy', icon: '⚡', onClick: () => onJumpToStep('utilities') },
          { label: 'Change transport', icon: '🚌', onClick: () => onJumpToStep('transport') },
          { label: 'Change food', icon: '🍔', onClick: () => setStage('food') },
          { label: 'Change savings', icon: '🐷', onClick: () => setStage('savings') },
        ]}
      />

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-lg font-extrabold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
        >
          🔁 Play Again
        </button>
      </div>
    </div>
  )
}
