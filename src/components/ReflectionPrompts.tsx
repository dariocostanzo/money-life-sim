type ReflectionPrompt = {
  label: string
  icon: string
  onClick: () => void
}

type ReflectionPromptsProps = {
  prompts: ReflectionPrompt[]
}

export function ReflectionPrompts({ prompts }: ReflectionPromptsProps) {
  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <h3 className="mb-3 text-center text-lg font-extrabold text-indigo-900 sm:text-xl">
        <span aria-hidden="true">🤔</span> Could you make it work better?
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {prompts.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={prompt.onClick}
            className="min-h-[48px] rounded-2xl border-2 border-transparent bg-white px-4 py-3 text-base font-bold text-indigo-900 shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">{prompt.icon}</span> {prompt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
