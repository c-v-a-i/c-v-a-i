import { useState, useEffect, useCallback } from 'react';
import type { StepConfig } from '../components/CreateCvFlow';

// TODO: ideally, this should contain the logic for step validation.
// something like 'setStepValid(true | false)' provided by useStepper hook
export const useStepper = (steps: StepConfig[], initialStep: number = 0) => {
  const [currentStep, setCurrentStep] = useState(() => initialStep);
  const [isValid, setIsValid] = useState(false);

  const validateCurrentStep = useCallback(() => {
    const validator = steps[currentStep]?.validate;
    setIsValid(validator?.() ?? true);
  }, [currentStep, steps]);

  useEffect(() => validateCurrentStep(), [currentStep, validateCurrentStep]);

  return {
    currentStep,
    isValid,
    totalSteps: steps.length,
    nextStep: () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1)),
    prevStep: () => setCurrentStep((s) => Math.max(s - 1, 0)),
    CurrentStep: steps[currentStep].component,
    stepConfig: steps[currentStep],
  };
};
