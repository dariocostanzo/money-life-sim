import { utilitiesOptions } from '../data/utilities'
import { UtilitiesCard } from './UtilitiesCard'

type UtilitiesSelectorProps = {
  selectedUtilitiesId: string | null
  onSelectUtilities: (utilitiesId: string) => void
}

export function UtilitiesSelector({ selectedUtilitiesId, onSelectUtilities }: UtilitiesSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {utilitiesOptions.map((option) => (
        <UtilitiesCard
          key={option.id}
          option={option}
          isSelected={option.id === selectedUtilitiesId}
          onSelect={onSelectUtilities}
        />
      ))}
    </div>
  )
}
