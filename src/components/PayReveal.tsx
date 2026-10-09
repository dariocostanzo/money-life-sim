import type { Career } from '../data/careers'
import type { Location } from '../data/locations'
import type { PayBreakdown } from '../lib/payCalculations'
import { formatGBP } from '../lib/formatMoney'
import { StepHeading } from './StepHeading'

type PayRevealProps = {
  career: Career
  location: Location
  pay: PayBreakdown
  onContinue: () => void
}

export function PayReveal({ career, location, pay, onContinue }: PayRevealProps) {
  const totalMonthlyDeductions = pay.monthlyIncomeTax + pay.monthlyNationalInsurance

  return (
    <div className="mx-auto max-w-xl text-center">
      <StepHeading icon="💷" title="Your Pay" />

      <p className="mb-6 text-lg font-medium text-indigo-700">
        <span aria-hidden="true">{location.icon}</span> {career.name} in {location.name}
      </p>

      <div className="space-y-4 rounded-3xl border-4 border-yellow-400 bg-gradient-to-b from-yellow-50 to-orange-100 p-6 shadow-xl">
        <div className="rounded-2xl bg-indigo-600 px-4 py-3 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-white">Annual Salary</p>
          <p className="text-2xl font-extrabold sm:text-3xl">{formatGBP(pay.annualSalary)}</p>
        </div>

        <div className="rounded-2xl bg-green-700 px-4 py-3 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-white">Take-Home Pay / Month</p>
          <p className="text-2xl font-extrabold sm:text-3xl">{formatGBP(pay.monthlyTakeHome)}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-indigo-700">
        <span aria-hidden="true">📍</span> Heads up — {location.multiplier > 1
          ? `${location.name} also has a higher cost of living, so housing, bills, transport, and food will cost more here too.`
          : location.multiplier < 1
            ? `${location.name} also has a lower cost of living, so housing, bills, transport, and food will cost less here too.`
            : `${location.name} has a typical UK cost of living, so housing, bills, transport, and food costs stay at their usual level.`}
        {' '}Keep that in mind for your next choices!
      </p>

      <div className="mt-6 rounded-3xl border-2 border-indigo-200 bg-white p-5 text-left shadow-md">
        <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-indigo-700">
          <span aria-hidden="true">🤔</span> Why isn't my take-home pay higher?
        </h3>
        <p className="mb-4 text-base text-indigo-700">
          Everyone who works in the UK pays some of their salary to the government. This pays for things like the
          NHS, schools, and roads. Here's where your money goes every month:
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-2">
            <span className="text-base font-semibold text-indigo-900">
              <span aria-hidden="true">💼</span> Gross Pay (before deductions)
            </span>
            <span className="text-base font-bold text-indigo-900">{formatGBP(pay.annualSalary / 12)}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-rose-50 px-4 py-2">
            <span className="text-base font-semibold text-rose-700">
              <span aria-hidden="true">📉</span> Income Tax
            </span>
            <span className="text-base font-bold text-rose-700">− {formatGBP(pay.monthlyIncomeTax)}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-rose-50 px-4 py-2">
            <span className="text-base font-semibold text-rose-700">
              <span aria-hidden="true">📉</span> National Insurance
            </span>
            <span className="text-base font-bold text-rose-700">− {formatGBP(pay.monthlyNationalInsurance)}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-2">
            <span className="text-base font-semibold text-green-700">
              <span aria-hidden="true">✅</span> Take-Home Pay
            </span>
            <span className="text-base font-bold text-green-700">{formatGBP(pay.monthlyTakeHome)}</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-indigo-700">
          In total, {formatGBP(totalMonthlyDeductions)} a month ({formatGBP(pay.annualIncomeTax + pay.annualNationalInsurance)}
          {' '}a year) goes to Income Tax and National Insurance.
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-lg font-extrabold text-white shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:w-auto sm:min-h-0"
      >
        Continue <span aria-hidden="true">➡️</span>
      </button>
    </div>
  )
}
