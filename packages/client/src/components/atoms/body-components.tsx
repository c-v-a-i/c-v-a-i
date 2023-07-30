import React from 'react'
import styled from '@emotion/styled'
import { COLORS, FONTS, ThemeType } from '../../styles'

interface ContainerProps {
  theme: ThemeType
}

export const Container = styled.div<ContainerProps>`
  font-family: ${FONTS.PRIMARY};
  color: ${COLORS.DARK};
  padding: 20px;
  background: ${({ theme }) => theme === ThemeType.LIGHT ? COLORS.LIGHT : COLORS.DARK};
`

export const Section = styled.section`
  margin-bottom: 20px;
`

export const Header = styled.h1`
  color: ${COLORS.PRIMARY};
`

export const SubHeader = styled.h2`
  color: ${COLORS.SECONDARY};
`
