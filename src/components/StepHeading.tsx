type StepHeadingProps = {
  icon: string
  title: string
}

export function StepHeading({ icon, title }: StepHeadingProps) {
  return (
    <h2 className="mb-6 text-center text-3xl font-extrabold text-indigo-900 sm:text-4xl">
      {icon} {title}
    </h2>
  )
}
