import {
  aboutMeData,
  contactInfoData,
  educationData,
  projectsData,
  skillsData,
  workExperienceData,
} from '@c-v-a-i/common';
import { Box, Divider, Grid } from '@mui/material';
import { About, ContactInfo, Education, Projects, Skills, WorkExperience } from '../atoms';
import { ContactInfoItem } from '../atoms/ContactInfoItem';

export const CvPreview = () => {
  return (
    <Box
      sx={{
        gap: '40px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        maxWidth: '1400px',
        padding: '80px 80px',
        justifyContent: 'center',
      }}
    >
      <Box display="flex" flexDirection="column" sx={{ width: '100%', gap: '20px' }}>
        <ContactInfo data={contactInfoData} />
        <About data={aboutMeData} />
      </Box>

      <Divider flexItem />

      <Grid container gap="80px">
        <Grid item xs={7} md={7} display="flex" flexDirection="column" gap={3}>
          <WorkExperience data={workExperienceData} />

          <Divider />

          <Projects data={projectsData} />
        </Grid>

        <Grid item xs={4} md={4}>
          <Box display="flex" flexDirection="column" gap="16px" sx={{ textAlign: 'end' }}>
            <Box display="flex" flexDirection="column" gap="8px">
              {Object.entries(contactInfoData).map(([name, value]) => (
                <ContactInfoItem key={name} name={name} value={value} />
              ))}
            </Box>

            <Education data={educationData} />

            <Skills data={skillsData} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
