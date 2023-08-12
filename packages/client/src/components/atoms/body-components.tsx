import React from 'react'
import styled from '@emotion/styled'
import { COLORS, FONTS, ThemeType } from '../../styles'
import { css } from '@emotion/react'

interface WithTheme {
  theme: ThemeType
}

export const Container = styled.div<WithTheme>`
  font-family: ${FONTS.PRIMARY};
  padding: 20px;

  ${({theme}) => css`
    background: ${COLORS.background(theme)};
    color: ${COLORS.text(theme).primary};
    box-shadow: 0px 0px 10px 0px ${COLORS.background(theme)};
  `}

  width: 1000px;
  margin: 0 auto;

`

export const Section = styled.section`
  margin-bottom: 20px;
  font-size: 0.9rem;
  line-height: 1.5rem;
  padding: 0 16px;
`

export const Header = styled.h1<WithTheme>`
  color: ${(props) => COLORS.text(props.theme).primary};
  font-size: 2rem;
  text-align: center;
  letter-spacing: 0.3rem;
`

export const SubHeader = styled.h2<WithTheme>`
  color: ${(props) => COLORS.text(props.theme).secondary};
  font-size: 1.4rem;
`

export const Paragraph = styled.p<WithTheme>`
  color: ${({theme}) => COLORS.text(theme).tertiary}
  font-size: 1rem;
  margin-bottom: 10px;
  font-family: 'Fira Code', monospace;
  margin-left: 2rem;
`

export const ListItem = styled.li<WithTheme>`
  color: ${({ theme }) => COLORS.text(theme).tertiary}
  font-size: 1rem;
  font-family: 'Fira Code', monospace;
`
