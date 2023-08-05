import React, { useState } from 'react'
import {
  Education,
  Skills,
  Projects,
  Achievements,
  ContactInfo,
  Container,
  WorkExperience
} from './components/atoms'
import {
  achievementsData,
  contactInfoData,
  educationData,
  projectsData,
  skillsData,
  workExperienceData,
} from '@cv-creator/common'
import { COLORS, ThemeType } from './styles'
import styled from '@emotion/styled'

const App: React.FC = () => {
  const [ theme, setTheme ] = useState<ThemeType>(ThemeType.LIGHT)

  const toggleTheme = () => setTheme(theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT)

  return (
    <Container theme={theme}>
      <ThemeButton onClick={toggleTheme} theme={theme} />
      <ContactInfo data={contactInfoData}/>
      <Projects data={projectsData}/>
      <WorkExperience data={workExperienceData}/>
      <Education data={educationData}/>
      <Skills data={skillsData}/>
    </Container>
  )
}


interface ThemeButtonProps {
  theme: ThemeType
}
const ThemeButton = styled.button<ThemeButtonProps>`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 25px;
  background: ${({ theme }) => theme === ThemeType.LIGHT ? COLORS.DARK : COLORS.LIGHT};
  border-radius: 50px ;
  
  &:hover {
    cursor: pointer;
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    transform: scale(0.9);
  }
`

export default App
