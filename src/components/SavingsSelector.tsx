import { savingsOptions } from '../data/savings'
import { calculateSavingsAmount } from '../lib/budgetCalculations'
import { ChoiceCard } from './ChoiceCard'

type SavingsSelectorProps = {
  monthlyIncome: number
  selectedSavingsId: string | null
  onSelectSavings: (savingsId: string) => void
}

export function SavingsSelector({ monthlyIncome, selectedSavingsId, onSelectSavings }: SavingsSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
      {savingsOptions.map((option, index) => (
        <ChoiceCard
          key={option.id}
          optionId={option.id}
          icon={option.icon}
          name={option.name}
          description={option.description}
          isSelected={option.id === selectedSavingsId}
          onSelect={onSelectSavings}
          amountLabel="Savings / Month"
          amount={calculateSavingsAmount(monthlyIncome, option.percentOfIncome)}
          amountColor="bg-green-700"
          index={index}
        />
      ))}
    </div>
  )
}
