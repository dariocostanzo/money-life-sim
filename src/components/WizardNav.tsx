type WizardNavProps = {
  onPrevious: () => void
  canGoPrevious: boolean
}

export function WizardNav({ onPrevious, canGoPrevious }: WizardNavProps) {
  return (
    <div className="mx-auto mt-10 flex max-w-3xl items-center justify-start">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="rounded-2xl px-6 py-3 text-base font-extrabold shadow-md transition-all duration-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none enabled:bg-white enabled:text-indigo-900 enabled:hover:-translate-y-0.5 enabled:hover:shadow-xl sm:text-lg"
      >
        ⬅️ Previous
      </button>
    </div>
  )
}
