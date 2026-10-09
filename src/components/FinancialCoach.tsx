import { useEffect, useRef, useState } from 'react'
import { getCoachObservations, getCoachTier } from '../lib/coachTemplates'
import { formatGBP } from '../lib/formatMoney'

const ANALYSIS_LINES = [
  'Analysing your lifestyle...',
  'Reviewing spending decisions...',
  'Building recommendations...',
]

/** How long each analysis line stays on screen before the next one appears. */
const LINE_DELAY_MS = 700

type FinancialCoachProps = {
  moneyLeftOver: number
  monthlyIncome: number
  monthlyHousingCost: number
  monthlyTransportCost: number
  monthlySavings: number
}

export function FinancialCoach({
  moneyLeftOver,
  monthlyIncome,
  monthlyHousingCost,
  monthlyTransportCost,
  monthlySavings,
}: FinancialCoachProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [lineIndex, setLineIndex] = useState(prefersReducedMotion ? ANALYSIS_LINES.length : 0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDone = lineIndex >= ANALYSIS_LINES.length

  useEffect(() => {
    if (prefersReducedMotion || isDone) return

    timeoutRef.current = setTimeout(() => {
      setLineIndex((index) => index + 1)
    }, LINE_DELAY_MS)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [lineIndex, isDone, prefersReducedMotion])

  const tier = getCoachTier(moneyLeftOver)
  const observations = getCoachObservations({
    monthlyIncome,
    monthlyHousingCost,
    monthlyTransportCost,
    monthlySavings,
  })

  return (
    <div className="mx-auto mt-8 max-w-xl animate-fade-in-up rounded-3xl border-4 border-white bg-indigo-900/90 p-6 shadow-2xl [animation-delay:300ms]">
      <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-white">
        <span aria-hidden="true">🤖</span> Financial Coach Analysis
      </h3>

      {!isDone ? (
        <p key={lineIndex} role="status" aria-live="polite" className="animate-fade-in-up text-center text-base font-semibold text-white">
          <span aria-hidden="true">🤖</span> {ANALYSIS_LINES[lineIndex]}
        </p>
      ) : (
        <div
          role="status"
          aria-live="polite"
          className="animate-fade-in-up rounded-3xl border-4 border-yellow-400 bg-gradient-to-b from-yellow-50 to-orange-100 p-6 text-center shadow-xl"
        >
          <p className="text-xl font-extrabold text-indigo-900">
            <span aria-hidden="true">{tier.emoji}</span> {tier.title}
          </p>
          <p className="mt-2 text-base text-indigo-700">{tier.message}</p>
          <p className="mt-3 text-sm font-semibold text-indigo-700">
            <span aria-hidden="true">💡</span> Tip: {tier.tip}
          </p>

          {observations.length > 0 && (
            <ul className="mt-4 space-y-1 text-left text-sm text-indigo-700">
              {observations.map((observation) => (
                <li key={observation} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{observation}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-xs text-indigo-700">
            Your money left over: {formatGBP(moneyLeftOver)} a month.
          </p>
        </div>
      )}
    </div>
  )
}
