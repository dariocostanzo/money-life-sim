import { formatGBP } from '../lib/formatMoney'

type ChoiceCardProps = {
  optionId: string
  icon: string
  name: string
  description: string
  isSelected: boolean
  onSelect: (optionId: string) => void
  amountLabel?: string
  amount?: number
  amountColor?: string
  /** Position in its grid, used to stagger the entrance animation. */
  index?: number
}

export function ChoiceCard({
  optionId,
  icon,
  name,
  description,
  isSelected,
  onSelect,
  amountLabel,
  amount,
  amountColor = 'bg-indigo-600',
  index = 0,
}: ChoiceCardProps) {
  const hasAmount = amountLabel !== undefined && amount !== undefined

  return (
    <button
      type="button"
      onClick={() => onSelect(optionId)}
      aria-pressed={isSelected}
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
      className={`group relative flex w-full cursor-pointer animate-fade-in-up items-center gap-3 rounded-2xl border-4 p-3 text-left transition-all duration-150 active:scale-95
        sm:flex-col sm:items-center sm:gap-0 sm:rounded-3xl sm:p-5 sm:text-center sm:active:scale-100
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600 focus-visible:ring-offset-2
        ${
          isSelected
            ? 'border-yellow-400 bg-gradient-to-b from-yellow-50 to-orange-100 shadow-xl sm:scale-105'
            : 'border-transparent bg-white shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-purple-300'
        }`}
    >
      {isSelected && (
        <span
          aria-hidden="true"
          className="absolute -top-2 -right-2 flex h-8 w-8 animate-pop-in items-center justify-center rounded-full bg-green-700 text-base font-bold text-white shadow-lg sm:-top-3 sm:-right-3 sm:h-9 sm:w-9 sm:text-lg"
        >
          ✓
        </span>
      )}

      <div className="shrink-0 text-4xl sm:mb-2 sm:text-6xl" aria-hidden="true">
        {icon}
      </div>

      <div className="min-w-0 flex-1 sm:flex-none">
        <span className="block text-base font-extrabold text-indigo-900 sm:text-lg sm:text-xl">{name}</span>
        <span className="block text-sm text-indigo-700 sm:mt-1 sm:text-base">{description}</span>
      </div>

      {hasAmount && (
        <div className={`shrink-0 rounded-xl ${amountColor} px-3 py-2 text-white sm:mt-auto sm:w-full sm:pt-2`}>
          <span className="sr-only sm:not-sr-only sm:block sm:text-xs sm:font-semibold sm:uppercase sm:tracking-wide">
            {amountLabel}
          </span>
          <span className="block text-base font-bold sm:text-lg sm:text-xl">{formatGBP(amount!)}</span>
        </div>
      )}

      <span className="sr-only">{isSelected ? 'Selected.' : 'Select to continue.'}</span>
    </button>
  )
}
