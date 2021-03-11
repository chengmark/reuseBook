import { COLOR } from '@src/styling'
import styled from 'styled-components'

const HEIGHT = 40

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0px;
  border-radius: 4px 4px 4px 4px;
  margin: 4px;
  width: 100%;
  min-height: ${HEIGHT}px;
`

export const Select = styled.select`
  height: ${HEIGHT}px;
  border: 0px;
  option {
  }
`

export const Input = styled.input`
  width: 100%;
  border: 0px;
  font-size: 14px;
`

export const Submit = styled.button`
  cursor: pointer;
  background: ${COLOR.secondary.tint2};
  border: 0px;
`
