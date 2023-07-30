import React from 'react'
import { Section, Header, SubHeader } from './body-components'
import { ContactInfoData } from '@cv-creator/common'


interface ContactInfoProps {
  data: ContactInfoData
}

export const ContactInfo: React.FC<ContactInfoProps> = ({data}) => (
  <Section>
    <Header>Contact Information</Header>
    <SubHeader>LinkedIn: {data.linkedIn}</SubHeader>
    <SubHeader>GitHub: {data.gitHub}</SubHeader>
  </Section>
)
