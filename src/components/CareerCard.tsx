import type { Career } from '../data/careers'
import { calculateMonthlyTakeHome } from '../lib/payCalculations'
import { formatGBP } from '../lib/formatMoney'

type CareerCardProps = {
  career: Career
  isSelected: boolean
  onSelect: (careerId: string) => void
}

export function CareerCard({ career, isSelected, onSelect }: CareerCardProps) {
  const monthlyTakeHome = calculateMonthlyTakeHome(career.annualSalary)

  return (
    <button
      type="button"
      onClick={() => onSelect(career.id)}
      aria-pressed={isSelected}
      className={`group relative flex flex-col items-center rounded-3xl border-4 p-5 text-center transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? 'border-yellow-400 bg-gradient-to-b from-yellow-50 to-orange-100 shadow-xl scale-105'
            : 'border-transparent bg-white shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-purple-300'
        }`}
    >
      {isSelected && (
        <span className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white shadow-lg">
          ✓
        </span>
      )}

      <div className="mb-3 h-28 w-28 overflow-hidden rounded-full border-4 border-indigo-200 bg-indigo-50 sm:h-32 sm:w-32">
        <img src={career.avatar} alt={`${career.name} avatar`} className="h-full w-full object-cover" />
      </div>

      <h3 className="text-lg font-extrabold text-indigo-900 sm:text-xl">{career.name}</h3>

      <div className="mt-auto w-full space-y-2 pt-3">
        <div className="w-full rounded-xl bg-indigo-600 px-3 py-2 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-200">Annual Salary</p>
          <p className="text-lg font-bold sm:text-xl">{formatGBP(career.annualSalary)}</p>
        </div>

        <div className="w-full rounded-xl bg-green-500 px-3 py-2 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-green-100">Take-Home Pay / Month</p>
          <p className="text-lg font-bold sm:text-xl">{formatGBP(monthlyTakeHome)}</p>
        </div>
      </div>
    </button>
  )
}
