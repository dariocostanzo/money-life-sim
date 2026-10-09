import logo from '../assets/logo/logo.png'

type LandingScreenProps = {
  onStart: () => void
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <img src={logo} alt="" className="mb-6 h-56 w-56 motion-safe:animate-float sm:h-72 sm:w-72" />

      <h1 className="animate-fade-in-up text-3xl font-extrabold text-indigo-900 sm:text-5xl">
        <span aria-hidden="true">💰</span> Money Life Sim
      </h1>
      <p className="mt-3 max-w-md animate-fade-in-up text-base font-medium text-indigo-700 [animation-delay:100ms] sm:text-lg">
        Pick a career, make lifestyle choices, and see how they shape your money every month.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="mt-10 w-full max-w-xs min-h-[56px] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-10 py-4 text-xl font-extrabold text-white shadow-xl transition-all duration-150 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 motion-safe:animate-pulse-soft sm:w-auto"
      >
        <span aria-hidden="true">▶️</span> Start
      </button>
    </div>
  )
}
