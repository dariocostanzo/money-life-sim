type LevelChipProps = {
  currentStepNumber: number
  totalSteps: number
}

export function LevelChip({ currentStepNumber, totalSteps }: LevelChipProps) {
  return (
    <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-indigo-950 shadow-md sm:text-sm">
      Level {currentStepNumber} of {totalSteps}
    </span>
  )
}
