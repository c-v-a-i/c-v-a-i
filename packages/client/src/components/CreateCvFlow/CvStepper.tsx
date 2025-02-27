import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useStepper } from '../../hooks/use-stepper';
import type { StepperProps } from './types';

export const CvStepper = <T extends object>({
  steps,
  initialData,
  onComplete,
  onCancel,
}: StepperProps<T>) => {
  const {
    currentStep,
    data,
    isValid,
    totalSteps,
    nextStep,
    prevStep,
    updateData,
    CurrentStep,
    stepConfig,
  } = useStepper<T>(steps, initialData);

  return (
    <Box display="flex" flexDirection="column" height="500px">
      <Stepper activeStep={currentStep} sx={{ p: 3 }}>
        {steps.map((_, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>

      <Box flex={1} p={3} overflow="auto">
        <CurrentStep data={data} updateData={updateData} />
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
