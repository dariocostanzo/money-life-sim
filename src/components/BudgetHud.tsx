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
  index,
}: {
  icon: string
  label: string
  amount: number
  color: string
  index: number
}) {
  return (
    <div
      style={{ animationDelay: `${index * 60}ms` }}
      className={`flex animate-fade-in-up flex-col items-center rounded-2xl ${color} px-3 py-4 text-white shadow-lg`}
    >
      <p className="text-2xl sm:text-3xl" aria-hidden="true">
        {icon}
      </p>
      <dt className="mt-1 text-center text-xs font-bold uppercase tracking-wide text-white">{label}</dt>
      <dd className="text-xl font-extrabold sm:text-xl">{formatGBP(amount)}</dd>
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
    <dl
      aria-label="Monthly budget"
      className="mx-auto mb-10 grid max-w-6xl grid-cols-2 gap-3 rounded-3xl border-4 border-white bg-indigo-900/90 p-4 shadow-2xl sm:grid-cols-4 lg:grid-cols-7"
    >
      <StatTile icon="💰" label="Monthly Income" amount={monthlyIncome} color="bg-blue-700" index={0} />
      <StatTile icon="🏠" label="Housing" amount={monthlyHousingCost} color="bg-rose-700" index={1} />
      <StatTile icon="⚡" label="Utilities" amount={monthlyUtilitiesCost} color="bg-cyan-700" index={2} />
      <StatTile icon="🚌" label="Transport" amount={monthlyTransportCost} color="bg-teal-700" index={3} />
      <StatTile icon="🍔" label="Food" amount={monthlyFoodCost} color="bg-amber-700" index={4} />
      <StatTile icon="🐷" label="Savings" amount={monthlySavings} color="bg-purple-700" index={5} />
      <StatTile
        icon={isShort ? '⚠️' : '✅'}
        label="Money Left Over"
        amount={moneyLeftOver}
        color={isShort ? 'bg-orange-700' : 'bg-green-700'}
        index={6}
      />
    </dl>
  )
}
