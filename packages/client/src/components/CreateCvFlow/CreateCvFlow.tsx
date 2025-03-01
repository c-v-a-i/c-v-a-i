import { Dialog } from '@mui/material';
import { CvGenerationStep, DescriptionStep, TemplateStep } from './steps';
import { CvStepper } from './CvStepper';
import { useCvCreationFlow, useDialog } from '../../contexts';
import { useCallback } from 'react';

const steps = [
  {
    component: TemplateStep,
    nextLabel: 'Use Template',
  },
  {
    component: DescriptionStep,
    nextLabel: 'Generate CV',
  },
  {
    component: CvGenerationStep,
    nextLabel: 'View CV',
  },
];

export const CvCreationDialog = () => {
  const { isOpen, close } = useDialog();
  const { templateId, clearForm } = useCvCreationFlow();
  const initialStep = templateId ? 1 : 0;

  const handleClose = useCallback(() => {
    close();
    clearForm();
  }, [clearForm, close]);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <CvStepper
        steps={steps}
        onCancel={close}
        onComplete={close}
        initialStep={initialStep}
      />
    </Dialog>
  );
};
