import { TextField } from '@material-ui/core'
import { MEDIA_BREAK } from '@src/layout'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.bg.light};
  padding: 15px;
  margin: 10px 0px 10px 0px;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 15px;
    margin: 0;
  }
`
export const Input = styled(TextField)`
  &.MuiFormControl-root {
    margin: 10px 0 10px 0;
    width: fill-available;
    &.MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: ${COLOR.primary.shade1};
      }
      &.Mui-error fieldset {
        border-color: ${COLOR.error.shade};
      }
    }
  }
`
