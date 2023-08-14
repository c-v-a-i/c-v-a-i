import React from 'react'
import { Section, Header, Paragraph, Anchor } from './body-components'
import { ContactInfoData } from '@cv-creator/common'
import styled from '@emotion/styled'
import { WithTheme } from '../../types'



type ContactInfoProps = WithTheme<{
  data: ContactInfoData
}>

export const ContactInfo: React.FC<ContactInfoProps> = ({data, theme}) => {
  return (
    <Section>
      <Header theme={theme}>Contact Information</Header>
      <ContactInfoWrapper>
        {Object.entries(data).map(([ key, value ]) => (
          <TwoColumnsWrapper>
            <ContactInfoParagraph theme={theme}><b>{key}</b></ContactInfoParagraph>
            <ContactInfoParagraph theme={theme}><Anchor href={`${value.includes('@') ? 'mailto:' : value.includes('+') ? 'tel:' : ''}${value}`}>{value}</Anchor></ContactInfoParagraph>
          </TwoColumnsWrapper>
        ))}
      </ContactInfoWrapper>
    </Section>
  )
}

const TwoColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`

const ContactInfoParagraph = styled(Paragraph)`
  margin: 0;
`

const ContactInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 0 auto;
`
