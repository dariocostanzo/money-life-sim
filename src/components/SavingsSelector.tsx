import { savingsOptions } from '../data/savings'
import { SavingsCard } from './SavingsCard'

type SavingsSelectorProps = {
  monthlyIncome: number
  selectedSavingsId: string | null
  onSelectSavings: (savingsId: string) => void
}

export function SavingsSelector({ monthlyIncome, selectedSavingsId, onSelectSavings }: SavingsSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {savingsOptions.map((option) => (
        <SavingsCard
          key={option.id}
          option={option}
          monthlyIncome={monthlyIncome}
          isSelected={option.id === selectedSavingsId}
          onSelect={onSelectSavings}
        />
      ))}
    </div>
  )
}
