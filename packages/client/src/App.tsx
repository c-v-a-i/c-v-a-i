import {
  aboutMeData, contactInfoData,
  educationData,
  projectsData,
  skillsData,
  workExperienceData
} from '@cv-creator/common'
import React from 'react'
import {
  About, ContactInfo,
  Container, Education, Projects, Skills, WorkExperience
} from './components/atoms'


const App: React.FC = () => {
  return (
    <Container sx={{ gap: '40px', display: 'flex', flexDirection: 'column' }} maxWidth='xl'>
      <ContactInfo
        data={contactInfoData}
      />

      <About>
        {aboutMeData}
      </About>

      <WorkExperience
        data={workExperienceData}
      />

      {/* <Projects */}
      {/*   data={projectsData} */}
      {/* /> */}

      <Education
        data={educationData}
      />
    </Container>
  )
}

export default App
