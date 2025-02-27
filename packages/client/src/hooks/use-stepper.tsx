import { useState, useEffect, useCallback } from 'react';

type StepConfig<T> = {
  component: React.FC<{ data: T; updateData: (update: Partial<T>) => void }>;
  validate?: (data: T) => boolean;
  nextLabel?: string;
};

export const useStepper = <T extends object>(
  steps: StepConfig<T>[],
  initialData: T
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<T>(initialData);
  const [isValid, setIsValid] = useState(false);

  const validateCurrentStep = useCallback(() => {
    const validator = steps[currentStep]?.validate;
    setIsValid(validator ? validator(data) : true);
  }, [currentStep, data, steps]);

  useEffect(
    () => validateCurrentStep(),
    [currentStep, data, validateCurrentStep]
  );

  return {
    currentStep,
    data,
    isValid,
    totalSteps: steps.length,
    nextStep: () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1)),
    prevStep: () => setCurrentStep((s) => Math.max(s - 1, 0)),
    updateData: (update: Partial<T>) =>
      setData((prev) => ({ ...prev, ...update })),
    CurrentStep: steps[currentStep].component,
    stepConfig: steps[currentStep],
  };
};
