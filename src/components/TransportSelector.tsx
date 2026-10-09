import { transportOptions } from '../data/transport'
import { TransportCard } from './TransportCard'

type TransportSelectorProps = {
  selectedTransportId: string | null
  onSelectTransport: (transportId: string) => void
}

export function TransportSelector({ selectedTransportId, onSelectTransport }: TransportSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {transportOptions.map((option) => (
        <TransportCard
          key={option.id}
          option={option}
          isSelected={option.id === selectedTransportId}
          onSelect={onSelectTransport}
        />
      ))}
    </div>
  )
}
