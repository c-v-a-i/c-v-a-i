import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useStepper } from '../../hooks/use-stepper';
import type { StepperProps } from './types';
import { Box } from '../atoms';
import { useCallback } from 'react';

export const CvStepper = ({
  steps,
  onComplete,
  onCancel,
  initialStep,
}: StepperProps) => {
  const {
    currentStep,
    isValid,
    totalSteps,
    nextStep,
    prevStep,
    stepConfig: { component: CurrentStepComponent, onSubmit, ...stepConfig },
  } = useStepper(steps, initialStep);

  const handleNextStep = useCallback(() => {
    onSubmit?.();
    if (currentStep === totalSteps - 1) {
      onComplete();
    }
    nextStep();
  }, [currentStep, nextStep, onComplete, onSubmit, totalSteps]);

  return (
    <Box display="flex" flexDirection="column" height="500px">
      <Stepper activeStep={currentStep} sx={{ p: 3 }}>
        {steps.map((_, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>

      <Box flex={1} p={3}>
        <CurrentStepComponent />
      </Box>

      <Box display="flex" justifyContent="space-between" p={3}>
        <Button onClick={onCancel}>Cancel</Button>

        <Box display="flex" gap={2}>
          {currentStep > 0 && <Button onClick={prevStep}>Back</Button>}

          <Button
            variant="contained"
            disabled={!isValid}
            onClick={handleNextStep}
          >
            {stepConfig.nextLabel ??
              (currentStep === totalSteps - 1 ? 'Complete' : 'Next')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
