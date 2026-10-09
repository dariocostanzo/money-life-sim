import { useEffect, useRef } from 'react'
import { formatGBP } from '../lib/formatMoney'

type MoneyCheckBannerProps = {
  moneyLeft: number
  icon: string
  question: string
}

export function MoneyCheckBanner({ moneyLeft, icon, question }: MoneyCheckBannerProps) {
  const isShort = moneyLeft < 0
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [question])

  return (
    <div className="mx-auto mb-4 max-w-3xl rounded-2xl border-4 border-white bg-indigo-900/90 p-3 text-center shadow-2xl sm:mb-8 sm:rounded-3xl sm:p-5">
      <p className="text-base font-bold text-white sm:text-xl">
        {isShort ? (
          <>
            <span aria-hidden="true">⚠️</span> You're already overspending by{' '}
            <span className="text-orange-300">{formatGBP(Math.abs(moneyLeft))}</span> a month...
          </>
        ) : (
          <>
            You have <span className="text-green-300">{formatGBP(moneyLeft)}</span> left each month...
          </>
        )}
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-lg font-extrabold text-yellow-300 outline-none sm:text-2xl"
      >
        <span aria-hidden="true">{icon}</span> {question}
      </h2>
    </div>
  )
}
