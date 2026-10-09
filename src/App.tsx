import { useEffect, useRef, useState } from 'react'
import { careers } from './data/careers'
import { locations } from './data/locations'
import { housingOptions } from './data/housing'
import { utilitiesOptions } from './data/utilities'
import { transportOptions } from './data/transport'
import { calculatePayBreakdown } from './lib/payCalculations'
import { applyLocationMultiplier } from './lib/budgetCalculations'
import { STEPS } from './lib/steps'
import type { StepId } from './lib/steps'
import { CareerSelector } from './components/CareerSelector'
import { LocationSelector } from './components/LocationSelector'
import { PayReveal } from './components/PayReveal'
import { HousingSelector } from './components/HousingSelector'
import { UtilitiesSelector } from './components/UtilitiesSelector'
import { TransportSelector } from './components/TransportSelector'
import { StepProgress } from './components/StepProgress'
import { StepHeading } from './components/StepHeading'
import { WizardNav } from './components/WizardNav'
import { ResultsScreen } from './components/ResultsScreen'
import { QrCodeBadge } from './components/QrCodeBadge'
import { LandingScreen } from './components/LandingScreen'

/** Gives the player a moment to see a card highlight before the step changes. */
const ADVANCE_DELAY_MS = 300

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null)
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [selectedHousingId, setSelectedHousingId] = useState<string | null>(null)
  const [selectedUtilitiesId, setSelectedUtilitiesId] = useState<string | null>(null)
  const [selectedTransportId, setSelectedTransportId] = useState<string | null>(null)
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null)
  const [selectedSavingsId, setSelectedSavingsId] = useState<string | null>(null)
  const [returnToResults, setReturnToResults] = useState(false)

  const selectedCareer = careers.find((career) => career.id === selectedCareerId) ?? null
  const selectedLocation = locations.find((location) => location.id === selectedLocationId) ?? null
  const selectedHousing = housingOptions.find((option) => option.id === selectedHousingId) ?? null
  const selectedUtilities = utilitiesOptions.find((option) => option.id === selectedUtilitiesId) ?? null
  const selectedTransport = transportOptions.find((option) => option.id === selectedTransportId) ?? null

  const locationMultiplier = selectedLocation?.multiplier ?? 1

  const annualSalary = selectedCareer && selectedLocation ? selectedCareer.annualSalary * locationMultiplier : 0
  const payBreakdown = calculatePayBreakdown(annualSalary)
  const monthlyIncome = selectedCareer && selectedLocation ? payBreakdown.monthlyTakeHome : 0
  const monthlyHousingCost = selectedHousing ? applyLocationMultiplier(selectedHousing.monthlyCost, locationMultiplier) : 0
  const monthlyUtilitiesCost = selectedUtilities
    ? applyLocationMultiplier(selectedUtilities.monthlyCost, locationMultiplier)
    : 0
  const monthlyTransportCost = selectedTransport
    ? applyLocationMultiplier(selectedTransport.monthlyCost, locationMultiplier)
    : 0

  const currentStep = STEPS[currentStepIndex]
  const isResultsStep = currentStep.id === 'results'
  const resultsStepIndex = STEPS.findIndex((step) => step.id === 'results')

  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentStepIndex])

  useEffect(() => {
    document.title = hasStarted ? `${currentStep.title} – Money Life Sim` : 'Money Life Sim'
  }, [hasStarted, currentStep.title])

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current)
    }
  }, [])

  function goToPreviousStep() {
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current)
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
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current)
    setSelection(id)
    advanceTimeoutRef.current = setTimeout(goToNextStep, ADVANCE_DELAY_MS)
  }

  function jumpToStep(stepId: StepId) {
    setReturnToResults(true)
    setCurrentStepIndex(STEPS.findIndex((step) => step.id === stepId))
  }

  function restart() {
    setSelectedCareerId(null)
    setSelectedLocationId(null)
    setSelectedHousingId(null)
    setSelectedUtilitiesId(null)
    setSelectedTransportId(null)
    setSelectedFoodId(null)
    setSelectedSavingsId(null)
    setReturnToResults(false)
    setCurrentStepIndex(0)
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 px-3 py-4 sm:px-4 sm:py-10">
        <main>
          <LandingScreen onStart={() => setHasStarted(true)} />
        </main>
        <QrCodeBadge />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 px-3 py-4 sm:px-4 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 text-center sm:mb-8">
          <h1 className="text-2xl font-extrabold text-indigo-900 sm:text-5xl">
            <span aria-hidden="true">💰</span> Money Life Sim
          </h1>
          <p className="mt-1 text-sm font-medium text-indigo-700 sm:mt-2 sm:text-lg">
            Build your life, one choice at a time!
          </p>
        </header>

        <StepProgress
          currentStepNumber={currentStepIndex + 1}
          totalSteps={STEPS.length}
          stepTitle={currentStep.title}
        />

        <p role="status" aria-live="polite" className="sr-only">
          Level {currentStepIndex + 1} of {STEPS.length}: {currentStep.title}
        </p>

        <main className="flex flex-col sm:min-h-[55vh] sm:justify-center">
          {currentStep.id === 'career' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <CareerSelector
                selectedCareerId={selectedCareerId}
                onSelectCareer={(id) => selectAndAdvance(setSelectedCareerId, id)}
              />
            </div>
          )}

          {currentStep.id === 'location' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <LocationSelector
                selectedLocationId={selectedLocationId}
                onSelectLocation={(id) => selectAndAdvance(setSelectedLocationId, id)}
              />
            </div>
          )}

          {currentStep.id === 'pay' && selectedCareer && selectedLocation && (
            <PayReveal
              career={selectedCareer}
              location={selectedLocation}
              pay={payBreakdown}
              onContinue={goToNextStep}
            />
          )}

          {currentStep.id === 'housing' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <HousingSelector
                selectedHousingId={selectedHousingId}
                onSelectHousing={(id) => selectAndAdvance(setSelectedHousingId, id)}
                locationMultiplier={locationMultiplier}
              />
            </div>
          )}

          {currentStep.id === 'utilities' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <UtilitiesSelector
                selectedUtilitiesId={selectedUtilitiesId}
                onSelectUtilities={(id) => selectAndAdvance(setSelectedUtilitiesId, id)}
                locationMultiplier={locationMultiplier}
              />
            </div>
          )}

          {currentStep.id === 'transport' && (
            <div>
              <StepHeading icon={currentStep.icon} title={currentStep.title} />
              <TransportSelector
                selectedTransportId={selectedTransportId}
                onSelectTransport={(id) => selectAndAdvance(setSelectedTransportId, id)}
                locationMultiplier={locationMultiplier}
              />
            </div>
          )}

          {isResultsStep && (
            <ResultsScreen
              monthlyIncome={monthlyIncome}
              monthlyHousingCost={monthlyHousingCost}
              monthlyUtilitiesCost={monthlyUtilitiesCost}
              monthlyTransportCost={monthlyTransportCost}
              locationMultiplier={locationMultiplier}
              selectedFoodId={selectedFoodId}
              onSelectFood={setSelectedFoodId}
              selectedSavingsId={selectedSavingsId}
              onSelectSavings={setSelectedSavingsId}
              onJumpToStep={jumpToStep}
              onRestart={restart}
            />
          )}
        </main>

        {currentStepIndex > 0 && <WizardNav onPrevious={goToPreviousStep} />}
      </div>

      <QrCodeBadge />
    </div>
  )
}

export default App
