import { careers } from '../data/careers'
import { CareerCard } from './CareerCard'

type CareerSelectorProps = {
  selectedCareerId: string | null
  onSelectCareer: (careerId: string) => void
}

export function CareerSelector({ selectedCareerId, onSelectCareer }: CareerSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {careers.map((career, index) => (
        <CareerCard
          key={career.id}
          career={career}
          isSelected={career.id === selectedCareerId}
          onSelect={onSelectCareer}
          index={index}
        />
      ))}
    </div>
  )
}
