import React from 'react'
import { Section, Header, SubHeader } from './body-components'
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
          <Section>{key}: {value}</Section>))
        }
      </ContactInfoWrapper>
    </Section>
  )
}

const ContactInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
`
