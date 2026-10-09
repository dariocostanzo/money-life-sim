import { LevelChip } from './LevelChip'
import { XpProgressBar } from './XpProgressBar'

type StepProgressProps = {
  currentStepNumber: number
  totalSteps: number
  stepTitle: string
}

export function StepProgress({ currentStepNumber, totalSteps, stepTitle }: StepProgressProps) {
  return (
    <div className="mx-auto mb-8 max-w-3xl rounded-3xl border-4 border-white bg-indigo-900/90 p-4 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <LevelChip currentStepNumber={currentStepNumber} totalSteps={totalSteps} />
        <p className="text-right text-sm font-bold text-white sm:text-base">{stepTitle}</p>
      </div>
      <div className="mt-3">
        <XpProgressBar currentStepNumber={currentStepNumber} totalSteps={totalSteps} />
      </div>
    </div>
  )
}
