import { COLOR } from '@src/styling'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: ${COLOR.bg.light};
`

export const ProductWrapper = styled.div`
  display; flex;
  flex-direction: column;
  width: 100%;
`

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
