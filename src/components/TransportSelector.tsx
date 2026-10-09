import { transportOptions } from '../data/transport'
import { applyLocationMultiplier } from '../lib/budgetCalculations'
import { ChoiceCard } from './ChoiceCard'

type TransportSelectorProps = {
  selectedTransportId: string | null
  onSelectTransport: (transportId: string) => void
  locationMultiplier: number
}

export function TransportSelector({ selectedTransportId, onSelectTransport, locationMultiplier }: TransportSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {transportOptions.map((option, index) => (
        <ChoiceCard
          key={option.id}
          optionId={option.id}
          icon={option.icon}
          name={option.name}
          description={option.description}
          isSelected={option.id === selectedTransportId}
          onSelect={onSelectTransport}
          amountLabel="Monthly Cost"
          amount={applyLocationMultiplier(option.monthlyCost, locationMultiplier)}
          amountColor="bg-teal-700"
          index={index}
        />
      ))}
    </div>
  )
}
