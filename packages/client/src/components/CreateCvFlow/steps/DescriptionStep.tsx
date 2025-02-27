import {
  TextField,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { CvState, StepComponentProps } from '../types';

type DescriptionStepProps = StepComponentProps<
  Pick<CvState, 'jobDescription' | 'templateId'>
>;

export const DescriptionStep = ({ data, updateData }: DescriptionStepProps) => (
  <Box display="flex" flexDirection="column" gap={3} height="100%">
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Selected Template Summary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography whiteSpace="pre-wrap">
          {data.templateId === '1'
            ? 'Senior Developer at Tech Corp\nSkills: React, Node.js, TypeScript'
            : 'Lead Designer at Creative Studio\nSkills: Figma, UX Research, Prototyping'}
        </Typography>
      </AccordionDetails>
    </Accordion>

    <TextField
      fullWidth
      multiline
      minRows={6}
      label="Job Description & Requirements"
      value={data.jobDescription}
      onChange={(e) => updateData({ jobDescription: e.target.value })}
    />
  </Box>
);
