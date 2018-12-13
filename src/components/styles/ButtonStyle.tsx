import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const ButtonMixin = css`
  background: ${ props => props.theme.violet };
  font-size: 2rem;
  padding: 1.2rem 2.8rem;
  border-radius: 0.2rem;
  cursor: pointer;

  &:hover {
    background: ${ props => darken(0.1, props.theme.violet) };
  }
`
