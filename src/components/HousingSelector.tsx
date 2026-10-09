import { housingOptions } from '../data/housing'
import { applyLocationMultiplier } from '../lib/budgetCalculations'
import { ChoiceCard } from './ChoiceCard'

type HousingSelectorProps = {
  selectedHousingId: string | null
  onSelectHousing: (housingId: string) => void
  locationMultiplier: number
}

export function HousingSelector({ selectedHousingId, onSelectHousing, locationMultiplier }: HousingSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {housingOptions.map((option, index) => (
        <ChoiceCard
          key={option.id}
          optionId={option.id}
          icon={option.icon}
          name={option.name}
          description={option.description}
          isSelected={option.id === selectedHousingId}
          onSelect={onSelectHousing}
          amountLabel="Monthly Cost"
          amount={applyLocationMultiplier(option.monthlyCost, locationMultiplier)}
          amountColor="bg-rose-700"
          index={index}
        />
      ))}
    </div>
  )
}
