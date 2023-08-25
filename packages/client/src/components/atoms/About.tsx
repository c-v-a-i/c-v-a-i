import { Header, Paragraph, Section } from './body-components'
import { WithTheme } from '../../types'
import styled from '@emotion/styled'


type AboutProps = WithTheme<{
  children: React.ReactNode
}>

export const About: React.FC<AboutProps> = ({ theme, children }) => {
  return (
    <Section>
      <Header theme={theme}>About</Header>
      <AboutParagraph theme={theme}>{children}</AboutParagraph>
    </Section>
  )
}

const AboutParagraph = styled(Paragraph)`
  margin: 0;
  `