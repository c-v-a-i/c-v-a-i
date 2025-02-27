export type CvState = {
  templateId?: string;
  jobDescription: string;
  progress: number;
};

export type StepComponentProps<T extends object> = {
  data: T;
  updateData: (update: Partial<T>) => void;
};

export type StepConfig<T extends object> = {
  component: React.FC<StepComponentProps<T>>;
  validate?: (data: T) => boolean;
  nextLabel?: string;
};

export type StepperProps<T extends object> = {
  steps: StepConfig<T>[];
  initialData: T;
  onComplete: () => void;
  onCancel: () => void;
};

export type StepValidator<T extends keyof CvState> = (
  data: Pick<CvState, T>
) => boolean;
