import { foodOptions } from '../data/food'
import { applyLocationMultiplier } from '../lib/budgetCalculations'
import { ChoiceCard } from './ChoiceCard'

type FoodSelectorProps = {
  selectedFoodId: string | null
  onSelectFood: (foodId: string) => void
  locationMultiplier: number
}

export function FoodSelector({ selectedFoodId, onSelectFood, locationMultiplier }: FoodSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {foodOptions.map((option, index) => (
        <ChoiceCard
          key={option.id}
          optionId={option.id}
          icon={option.icon}
          name={option.name}
          description={option.description}
          isSelected={option.id === selectedFoodId}
          onSelect={onSelectFood}
          amountLabel="Monthly Cost"
          amount={applyLocationMultiplier(option.monthlyCost, locationMultiplier)}
          amountColor="bg-amber-700"
          index={index}
        />
      ))}
    </div>
  )
}
