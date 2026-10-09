import { useEffect, useRef } from 'react'

type StepHeadingProps = {
  icon: string
  title: string
}

export function StepHeading({ icon, title }: StepHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [title])

  return (
    <h2
      ref={headingRef}
      tabIndex={-1}
      className="mb-6 animate-fade-in-up text-center text-3xl font-extrabold text-indigo-900 outline-none sm:text-4xl"
    >
      <span aria-hidden="true">{icon}</span> {title}
    </h2>
  )
}
