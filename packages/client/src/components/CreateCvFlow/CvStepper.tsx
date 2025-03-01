import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useStepper } from '../../hooks/use-stepper';
import type { StepperProps } from './types';
import { Box } from '../atoms';

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
    CurrentStep,
    stepConfig,
  } = useStepper(steps, initialStep);

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
        <CurrentStep />
      </Box>

      <Box display="flex" justifyContent="space-between" p={3}>
        <Button onClick={onCancel}>Cancel</Button>

        <Box display="flex" gap={2}>
          {currentStep > 0 && <Button onClick={prevStep}>Back</Button>}

          <Button
            variant="contained"
            disabled={!isValid}
            onClick={currentStep === totalSteps - 1 ? onComplete : nextStep}
          >
            {stepConfig.nextLabel ??
              (currentStep === totalSteps - 1 ? 'Complete' : 'Next')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
