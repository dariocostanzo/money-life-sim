import { formatGBP } from '../lib/formatMoney'

type MoneyCheckBannerProps = {
  moneyLeft: number
  question: string
}

export function MoneyCheckBanner({ moneyLeft, question }: MoneyCheckBannerProps) {
  const isShort = moneyLeft < 0

  return (
    <div className="mx-auto mb-8 max-w-3xl rounded-3xl border-4 border-white bg-indigo-900/90 p-5 text-center shadow-2xl">
      <p className="text-lg font-bold text-white sm:text-xl">
        {isShort ? (
          <>
            ⚠️ You're already overspending by{' '}
            <span className="text-orange-300">{formatGBP(Math.abs(moneyLeft))}</span> a month...
          </>
        ) : (
          <>
            You have <span className="text-green-300">{formatGBP(moneyLeft)}</span> left each month...
          </>
        )}
      </p>
      <p className="mt-2 text-xl font-extrabold text-yellow-300 sm:text-2xl">{question}</p>
    </div>
  )
}
