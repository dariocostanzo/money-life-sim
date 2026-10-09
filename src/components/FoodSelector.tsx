import { foodOptions } from '../data/food'
import { FoodCard } from './FoodCard'

type FoodSelectorProps = {
  selectedFoodId: string | null
  onSelectFood: (foodId: string) => void
}

export function FoodSelector({ selectedFoodId, onSelectFood }: FoodSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {foodOptions.map((option) => (
        <FoodCard
          key={option.id}
          option={option}
          isSelected={option.id === selectedFoodId}
          onSelect={onSelectFood}
        />
      ))}
    </div>
  )
}
