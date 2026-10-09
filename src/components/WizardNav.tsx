type WizardNavProps = {
  onPrevious: () => void
}

export function WizardNav({ onPrevious }: WizardNavProps) {
  return (
    <div className="mx-auto mt-6 flex max-w-3xl items-center justify-start sm:mt-10">
      <button
        type="button"
        onClick={onPrevious}
        className="w-full min-h-[48px] rounded-2xl bg-white px-6 py-3 text-base font-extrabold text-indigo-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:w-auto sm:min-h-0 sm:text-lg sm:active:scale-100"
      >
        <span aria-hidden="true">⬅️</span> Previous
      </button>
    </div>
  )
}
