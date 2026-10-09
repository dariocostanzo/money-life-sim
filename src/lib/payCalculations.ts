/**
 * UK Income Tax and National Insurance figures for the 2025/26 tax year.
 * Source: GOV.UK "Income Tax rates and Personal Allowances" (gov.uk/income-tax-rates)
 * and GOV.UK "Rates and thresholds for employers 2025 to 2026"
 * (gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026).
 *
 * Simplified for an educational game: assumes a standard tax code, no student
 * loan repayments, pension contributions, or other deductions.
 */
const PERSONAL_ALLOWANCE = 12570
const BASIC_RATE_LIMIT = 50270
const HIGHER_RATE_LIMIT = 125140

const BASIC_RATE = 0.2
const HIGHER_RATE = 0.4
const ADDITIONAL_RATE = 0.45

const NI_PRIMARY_THRESHOLD = 12570
const NI_UPPER_EARNINGS_LIMIT = 50270
const NI_MAIN_RATE = 0.08
const NI_ADDITIONAL_RATE = 0.02

function calculateIncomeTax(annualSalary: number): number {
  if (annualSalary <= PERSONAL_ALLOWANCE) return 0

  let tax = 0
  const taxableIncome = annualSalary - PERSONAL_ALLOWANCE

  const basicBand = Math.min(taxableIncome, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE)
  tax += basicBand * BASIC_RATE

  if (annualSalary > BASIC_RATE_LIMIT) {
    const higherBand = Math.min(annualSalary, HIGHER_RATE_LIMIT) - BASIC_RATE_LIMIT
    tax += higherBand * HIGHER_RATE
  }

  if (annualSalary > HIGHER_RATE_LIMIT) {
    const additionalBand = annualSalary - HIGHER_RATE_LIMIT
    tax += additionalBand * ADDITIONAL_RATE
  }

  return tax
}

function calculateNationalInsurance(annualSalary: number): number {
  if (annualSalary <= NI_PRIMARY_THRESHOLD) return 0

  let ni = 0
  const mainBand = Math.min(annualSalary, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD
  ni += mainBand * NI_MAIN_RATE

  if (annualSalary > NI_UPPER_EARNINGS_LIMIT) {
    ni += (annualSalary - NI_UPPER_EARNINGS_LIMIT) * NI_ADDITIONAL_RATE
  }

  return ni
}

export function calculateAnnualTakeHome(annualSalary: number): number {
  const incomeTax = calculateIncomeTax(annualSalary)
  const nationalInsurance = calculateNationalInsurance(annualSalary)
  return annualSalary - incomeTax - nationalInsurance
}

export function calculateMonthlyTakeHome(annualSalary: number): number {
  return calculateAnnualTakeHome(annualSalary) / 12
}
