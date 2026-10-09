type XpProgressBarProps = {
  currentStepNumber: number
  totalSteps: number
}

export function XpProgressBar({ currentStepNumber, totalSteps }: XpProgressBarProps) {
  const percentComplete = (currentStepNumber / totalSteps) * 100

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStepNumber}
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      className="h-4 w-full overflow-hidden rounded-full bg-indigo-950/60"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500 ease-out"
        style={{ width: `${percentComplete}%` }}
      />
    </div>
  )
}
