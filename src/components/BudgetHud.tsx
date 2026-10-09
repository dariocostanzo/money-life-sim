import { formatGBP } from '../lib/formatMoney'

type BudgetHudProps = {
  monthlyIncome: number
  monthlyHousingCost: number
  monthlyUtilitiesCost: number
  monthlyTransportCost: number
  monthlyFoodCost: number
  monthlySavings: number
  moneyLeftOver: number
}

function StatTile({
  icon,
  label,
  amount,
  color,
}: {
  icon: string
  label: string
  amount: number
  color: string
}) {
  return (
    <div className={`flex flex-col items-center rounded-2xl ${color} px-3 py-4 text-white shadow-lg`}>
      <p className="text-2xl sm:text-3xl">{icon}</p>
      <p className="mt-1 text-center text-[10px] font-bold uppercase tracking-wide text-white/80 sm:text-xs">
        {label}
      </p>
      <p className="text-lg font-extrabold sm:text-xl">{formatGBP(amount)}</p>
    </div>
  )
}

export function BudgetHud({
  monthlyIncome,
  monthlyHousingCost,
  monthlyUtilitiesCost,
  monthlyTransportCost,
  monthlyFoodCost,
  monthlySavings,
  moneyLeftOver,
}: BudgetHudProps) {
  const isShort = moneyLeftOver < 0

  return (
    <div className="mx-auto mb-10 grid max-w-6xl grid-cols-2 gap-3 rounded-3xl border-4 border-white bg-indigo-900/90 p-4 shadow-2xl sm:grid-cols-4 lg:grid-cols-7">
      <StatTile icon="💰" label="Monthly Income" amount={monthlyIncome} color="bg-blue-600" />
      <StatTile icon="🏠" label="Housing" amount={monthlyHousingCost} color="bg-rose-500" />
      <StatTile icon="⚡" label="Utilities" amount={monthlyUtilitiesCost} color="bg-cyan-600" />
      <StatTile icon="🚌" label="Transport" amount={monthlyTransportCost} color="bg-teal-600" />
      <StatTile icon="🍔" label="Food" amount={monthlyFoodCost} color="bg-amber-500" />
      <StatTile icon="🐷" label="Savings" amount={monthlySavings} color="bg-purple-600" />
      <StatTile
        icon={isShort ? '⚠️' : '✅'}
        label="Money Left Over"
        amount={moneyLeftOver}
        color={isShort ? 'bg-orange-500' : 'bg-green-500'}
      />
    </div>
  )
}
