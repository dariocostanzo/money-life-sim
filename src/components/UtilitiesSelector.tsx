import { utilitiesOptions } from '../data/utilities'
import { applyLocationMultiplier } from '../lib/budgetCalculations'
import { ChoiceCard } from './ChoiceCard'

type UtilitiesSelectorProps = {
  selectedUtilitiesId: string | null
  onSelectUtilities: (utilitiesId: string) => void
  locationMultiplier: number
}

export function UtilitiesSelector({ selectedUtilitiesId, onSelectUtilities, locationMultiplier }: UtilitiesSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {utilitiesOptions.map((option, index) => (
        <ChoiceCard
          key={option.id}
          optionId={option.id}
          icon={option.icon}
          name={option.name}
          description={option.description}
          isSelected={option.id === selectedUtilitiesId}
          onSelect={onSelectUtilities}
          amountLabel="Monthly Cost"
          amount={applyLocationMultiplier(option.monthlyCost, locationMultiplier)}
          amountColor="bg-cyan-700"
          index={index}
        />
      ))}
    </div>
  )
}
