import { locations } from '../data/locations'
import { ChoiceCard } from './ChoiceCard'

type LocationSelectorProps = {
  selectedLocationId: string | null
  onSelectLocation: (locationId: string) => void
}

export function LocationSelector({ selectedLocationId, onSelectLocation }: LocationSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {locations.map((location, index) => (
        <ChoiceCard
          key={location.id}
          optionId={location.id}
          icon={location.icon}
          name={location.name}
          description={location.description}
          isSelected={location.id === selectedLocationId}
          onSelect={onSelectLocation}
          index={index}
        />
      ))}
    </div>
  )
}
