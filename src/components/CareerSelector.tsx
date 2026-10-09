import { careers } from '../data/careers'
import { CareerCard } from './CareerCard'

type CareerSelectorProps = {
  selectedCareerId: string | null
  onSelectCareer: (careerId: string) => void
}

export function CareerSelector({ selectedCareerId, onSelectCareer }: CareerSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {careers.map((career) => (
        <CareerCard
          key={career.id}
          career={career}
          isSelected={career.id === selectedCareerId}
          onSelect={onSelectCareer}
        />
      ))}
    </div>
  )
}
