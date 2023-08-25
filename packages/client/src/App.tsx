import React from 'react'
import {
  Education,
  Skills,
  Projects,
  ContactInfo,
  Container,
  WorkExperience, About,
} from './components/atoms'
import {
  contactInfoData,
  educationData,
  projectsData,
  skillsData,
  workExperienceData,
  aboutMeData,
} from '@cv-creator/common'
import { COLORS, ThemeType } from './styles'
import styled from '@emotion/styled'
import { useTheme } from './contexts/theme-context'
import { WithTheme } from './types'


const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <ThemeButton
        onClick={toggleTheme}
        theme={theme}
      />
      <Container theme={theme}>
        <ContactInfo
          data={contactInfoData}
          theme={theme}
        />
        <Separator theme={theme}/>
        <About theme={theme}>
          {aboutMeData}
        </About>
        <Separator theme={theme}/>

        <Education
          data={educationData}
          theme={theme}
        />
        <Separator theme={theme}/>

        <WorkExperience
          data={workExperienceData}
          theme={theme}
        />
        <Separator theme={theme}/>

        <Projects
          data={projectsData}
          theme={theme}
        />
        <Separator theme={theme}/>

        <Skills
          data={skillsData}
          theme={theme}
        />
      </Container>
    </>
  )
}

const Separator = styled.div<WithTheme<{}>>`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => COLORS.background(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK)};
  margin: 20px 0;
`

const ThemeButton = styled.button<WithTheme<{}>>`
  background: ${({ theme }) => COLORS.background(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK)};

  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 25px;

  border-radius: 50px;

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
