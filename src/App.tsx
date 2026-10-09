import { useState } from 'react'
import { careers } from './data/careers'
import { housingOptions } from './data/housing'
import { utilitiesOptions } from './data/utilities'
import { transportOptions } from './data/transport'
import { calculateMonthlyTakeHome } from './lib/payCalculations'
import { STEPS } from './lib/steps'
import type { StepId } from './lib/steps'
import { CareerSelector } from './components/CareerSelector'
import { HousingSelector } from './components/HousingSelector'
import { UtilitiesSelector } from './components/UtilitiesSelector'
import { TransportSelector } from './components/TransportSelector'
import { StepProgress } from './components/StepProgress'
import { StepHeading } from './components/StepHeading'
import { WizardNav } from './components/WizardNav'
import { ResultsScreen } from './components/ResultsScreen'

/** Gives the player a moment to see a card highlight before the step changes. */
const ADVANCE_DELAY_MS = 450

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null)
  const [selectedHousingId, setSelectedHousingId] = useState<string | null>(null)
  const [selectedUtilitiesId, setSelectedUtilitiesId] = useState<string | null>(null)
  const [selectedTransportId, setSelectedTransportId] = useState<string | null>(null)
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)
  const [selectedSavingsId, setSelectedSavingsId] = useState<string | null>(null)
  const [returnToResults, setReturnToResults] = useState(false)

  const selectedCareer = careers.find((career) => career.id === selectedCareerId) ?? null
  const selectedHousing = housingOptions.find((option) => option.id === selectedHousingId) ?? null
  const selectedUtilities = utilitiesOptions.find((option) => option.id === selectedUtilitiesId) ?? null
  const selectedTransport = transportOptions.find((option) => option.id === selectedTransportId) ?? null

  const monthlyIncome = selectedCareer ? calculateMonthlyTakeHome(selectedCareer.annualSalary) : 0
  const monthlyHousingCost = selectedHousing?.monthlyCost ?? 0
  const monthlyUtilitiesCost = selectedUtilities?.monthlyCost ?? 0
  const monthlyTransportCost = selectedTransport?.monthlyCost ?? 0

  const currentStep = STEPS[currentStepIndex]
  const isResultsStep = currentStep.id === 'results'
  const resultsStepIndex = STEPS.findIndex((step) => step.id === 'results')

  function goToPreviousStep() {
    setCurrentStepIndex((index) => Math.max(0, index - 1))
  }

  function goToNextStep() {
    setCurrentStepIndex((index) => {
      if (returnToResults) {
        setReturnToResults(false)
        return resultsStepIndex
      }
      return Math.min(STEPS.length - 1, index + 1)
    })
  }

  function selectAndAdvance(setSelection: (id: string) => void, id: string) {
    setSelection(id)
    setTimeout(goToNextStep, ADVANCE_DELAY_MS)
  }

  function jumpToStep(stepId: StepId) {
    setReturnToResults(true)
    setCurrentStepIndex(STEPS.findIndex((step) => step.id === stepId))
  }

  function restart() {
    setSelectedCareerId(null)
    setSelectedHousingId(null)
    setSelectedUtilitiesId(null)
    setSelectedTransportId(null)
    setSelectedFoodId(null)
    setSelectedSavingsId(null)
    setReturnToResults(false)
    setCurrentStepIndex(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-900 sm:text-5xl">💰 Money Life Sim</h1>
          <p className="mt-2 text-lg font-medium text-indigo-700">Build your life, one choice at a time!</p>
        </header>

        <StepProgress
          currentStepNumber={currentStepIndex + 1}
          totalSteps={STEPS.length}
          stepTitle={currentStep.title}
        />

        <div className="flex min-h-[55vh] flex-col justify-center">
          {currentStep.id === 'career' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <CareerSelector
                selectedCareerId={selectedCareerId}
                onSelectCareer={(id) => selectAndAdvance(setSelectedCareerId, id)}
              />
            </div>
          )}

          {currentStep.id === 'housing' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <HousingSelector
                selectedHousingId={selectedHousingId}
                onSelectHousing={(id) => selectAndAdvance(setSelectedHousingId, id)}
              />
            </div>
          )}

          {currentStep.id === 'utilities' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <UtilitiesSelector
                selectedUtilitiesId={selectedUtilitiesId}
                onSelectUtilities={(id) => selectAndAdvance(setSelectedUtilitiesId, id)}
              />
            </div>
          )}

          {currentStep.id === 'transport' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <TransportSelector
                selectedTransportId={selectedTransportId}
                onSelectTransport={(id) => selectAndAdvance(setSelectedTransportId, id)}
              />
            </div>
          )}

          {isResultsStep && (
            <ResultsScreen
              monthlyIncome={monthlyIncome}
              monthlyHousingCost={monthlyHousingCost}
              monthlyUtilitiesCost={monthlyUtilitiesCost}
              monthlyTransportCost={monthlyTransportCost}
              selectedFoodId={selectedFoodId}
              onSelectFood={setSelectedFoodId}
              selectedSavingsId={selectedSavingsId}
              onSelectSavings={setSelectedSavingsId}
              onJumpToStep={jumpToStep}
              onRestart={restart}
            />
          )}
        </div>

        <WizardNav onPrevious={goToPreviousStep} canGoPrevious={currentStepIndex > 0} />
      </div>
    </div>
  )
}

export default App
