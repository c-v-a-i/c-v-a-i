import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import type { CvState, StepComponentProps } from '../types';

type TemplateStepProps = StepComponentProps<Pick<CvState, 'templateId'>>;

export const TemplateStep = ({ data, updateData }: TemplateStepProps) => (
  <Box display="flex" flexDirection="column" gap={3}>
    <FormControl fullWidth>
      <InputLabel>CV Template</InputLabel>
      <Select
        value={data.templateId ?? ''}
        onChange={(e) => updateData({ templateId: e.target.value })}
        label="CV Template"
      >
        <MenuItem value="1">Developer Template</MenuItem>
        <MenuItem value="2">Designer Template</MenuItem>
      </Select>
    </FormControl>

    <Typography variant="body2" color="text.secondary">
      Creating from scratch is currently unavailable
    </Typography>
  </Box>
);
