import type { SavingsOption } from '../data/savings'
import { calculateSavingsAmount } from '../lib/budgetCalculations'
import { formatGBP } from '../lib/formatMoney'

type SavingsCardProps = {
  option: SavingsOption
  monthlyIncome: number
  isSelected: boolean
  onSelect: (savingsId: string) => void
}

export function SavingsCard({ option, monthlyIncome, isSelected, onSelect }: SavingsCardProps) {
  const savingsAmount = calculateSavingsAmount(monthlyIncome, option.percentOfIncome)

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
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

      <div className="mb-2 text-6xl">{option.icon}</div>

      <h3 className="text-lg font-extrabold text-indigo-900 sm:text-xl">{option.name}</h3>
      <p className="mt-1 text-sm text-indigo-700">{option.description}</p>

      <div className="mt-auto w-full rounded-xl bg-green-500 px-3 py-2 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-green-100">Savings / Month</p>
        <p className="text-lg font-bold sm:text-xl">{formatGBP(savingsAmount)}</p>
      </div>
    </button>
  )
}
