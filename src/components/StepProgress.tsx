import { LevelChip } from './LevelChip'
import { XpProgressBar } from './XpProgressBar'

type StepProgressProps = {
  currentStepNumber: number
  totalSteps: number
  stepTitle: string
}

export function StepProgress({ currentStepNumber, totalSteps, stepTitle }: StepProgressProps) {
  return (
    <div className="sticky top-0 z-20 mx-auto mb-4 max-w-3xl rounded-2xl border-4 border-white bg-indigo-900/90 p-3 shadow-2xl sm:mb-8 sm:rounded-3xl sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <LevelChip currentStepNumber={currentStepNumber} totalSteps={totalSteps} />
        <p className="text-right text-xs font-bold text-white sm:text-base">{stepTitle}</p>
      </div>
      <div className="mt-2 sm:mt-3">
        <XpProgressBar currentStepNumber={currentStepNumber} totalSteps={totalSteps} stepTitle={stepTitle} />
      </div>
    </div>
  )
}
