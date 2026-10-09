import type { Career } from '../data/careers'

type CareerCardProps = {
  career: Career
  isSelected: boolean
  onSelect: (careerId: string) => void
  /** Position in the grid, used to stagger the entrance animation. */
  index?: number
}

export function CareerCard({ career, isSelected, onSelect, index = 0 }: CareerCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(career.id)}
      aria-pressed={isSelected}
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
      className={`group relative flex animate-fade-in-up flex-col items-center rounded-2xl border-4 p-3 text-center transition-all duration-150 cursor-pointer active:scale-95
        sm:rounded-3xl sm:p-5 sm:active:scale-100
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

      <div className="mb-2 h-20 w-20 overflow-hidden rounded-full border-4 border-indigo-200 bg-indigo-50 sm:mb-3 sm:h-32 sm:w-32">
        <img src={career.avatar} alt="" className="h-full w-full object-cover" />
      </div>

      <span className="block text-base font-extrabold text-indigo-900 sm:text-xl">{career.name}</span>

      <span className="sr-only">{isSelected ? 'Selected.' : 'Select to continue.'}</span>
    </button>
  )
}
