export type StepId = 'career' | 'housing' | 'utilities' | 'transport' | 'results'

export type Step = {
  id: StepId
  title: string
  icon: string
}

export const STEPS: Step[] = [
  { id: 'career', title: 'Choose Your Career', icon: '💼' },
  { id: 'housing', title: 'Choose Where You\'ll Live', icon: '🏠' },
  { id: 'utilities', title: 'Choose Your Energy Usage', icon: '⚡' },
  { id: 'transport', title: 'Choose How You\'ll Get Around', icon: '🚌' },
  { id: 'results', title: 'Your Results', icon: '🏆' },
]
