import { housingOptions } from '../data/housing'
import { HousingCard } from './HousingCard'

type HousingSelectorProps = {
  selectedHousingId: string | null
  onSelectHousing: (housingId: string) => void
}

export function HousingSelector({ selectedHousingId, onSelectHousing }: HousingSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {housingOptions.map((option) => (
        <HousingCard
          key={option.id}
          option={option}
          isSelected={option.id === selectedHousingId}
          onSelect={onSelectHousing}
        />
      ))}
    </div>
  )
}
