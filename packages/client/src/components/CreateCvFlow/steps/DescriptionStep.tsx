import { TextField } from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiInfoIcon from '@mui/icons-material/Info';
import { useCvCreationFlow } from '../../../contexts';

export const DescriptionStep = () => {
  const { templateCvSummarization, prompt, setPrompt } = useCvCreationFlow();

  return (
    <Box display="flex" flexDirection="column" gap={3} height="100%">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Selected Template Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography whiteSpace="pre-wrap">
            {templateCvSummarization}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Box position={'relative'}>
        <TextField
          fullWidth
          multiline
          minRows={6}
          label="Job Description & Requirements"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Tooltip
          title={
            <Typography variant="body2" padding={1}>
              You can copy and paste the job position you want to fine-tune your
              CV for. Alternatively, you can specify desired changes or
              improvements you'd like to make to your CV format. Include any
              specific requirements or preferences for the final document.
            </Typography>
          }
          leaveDelay={200}
          placement="right-start"
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: 'background.paper',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'divider',
              },
            },
          }}
        >
          <InfoIcon />
        </Tooltip>
      </Box>
    </Box>
  );
};

const InfoIcon = styled(MuiInfoIcon)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  color: theme.palette.primary.dark,
}));
