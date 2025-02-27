import { Dialog } from '@mui/material';
import { CvGenerationStep, DescriptionStep, TemplateStep } from './steps';
import { CvStepper } from './CvStepper';
import type { CvState, StepComponentProps } from './types';

export const CvCreationDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const steps = [
    {
      component: TemplateStep,
      validate: (data: CvState) => !!data.templateId,
      nextLabel: 'Use Template',
    },
    {
      component: DescriptionStep,
      validate: (data: CvState) => data.jobDescription.trim().length > 0,
      nextLabel: 'Generate CV',
    },
    {
      component: (data: StepComponentProps<CvState>) =>
        CvGenerationStep({ open, ...data }),
      nextLabel: 'View CV',
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <CvStepper<CvState>
        steps={steps}
        initialData={{ jobDescription: '', progress: 0 }}
        onCancel={onClose}
        onComplete={onClose}
      />
    </Dialog>
  );
};
