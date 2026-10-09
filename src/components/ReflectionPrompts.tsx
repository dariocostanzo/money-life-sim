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
      <p className="mb-3 text-center text-lg font-extrabold text-indigo-900 sm:text-xl">
        🤔 Could you make it work better?
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {prompts.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={prompt.onClick}
            className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-indigo-900 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-purple-300 sm:text-base"
          >
            {prompt.icon} {prompt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
