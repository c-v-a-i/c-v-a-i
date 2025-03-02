export type CvState = {
  templateId?: string;
  jobDescription: string;
  progress: number;
};

export type StepConfig = {
  component: React.FC;
  validate?: () => boolean;
  nextLabel?: string;
  onSubmit?: () => void;
};

export type StepperProps = {
  initialStep: number;
  steps: StepConfig[];
  onComplete: () => void;
  onCancel: () => void;
};
