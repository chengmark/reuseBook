import { Button, TextField } from '@material-ui/core'
import { MEDIA_BREAK } from '@src/layout'
import { COLOR } from '@src/styling'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    margin-top:300px;
    opacity: 0.1;
  }

  to {
    margin-top:0px;
    opacity: 1;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s linear;
  @media (max-width: ${MEDIA_BREAK}px) {
    height: 100%;
    width: calc(100% - 20px);
    padding: 0 10px 0 10px;
    justify-content: start;
  }
`

type Props = {
  secondary?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.bg.light};
  border: 1px solid ${COLOR.divider.dark};
  padding: 35px;
  margin: 10px 0px 10px 0px;
  width: 100%;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 15px;
    margin: 0;
    flex: ${(props: Props) => (props.secondary ? `1` : `8`)};
    border-top: ${(props: Props) => (props.secondary ? `0px` : ``)};
    border-bottom: ${(props: Props) => (props.secondary ? `0px` : ``)};
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
export const Btn = styled(Button)`
  &.MuiButton-root {
    width: fill-available;
    margin: 10px 0 10px 0;
    background: ${COLOR.primary.shade1};
    &:hover {
      background: ${COLOR.primary.shade2};
    }
  }
`

export const MessageWrapper = styled.div``

export const InputWrapper = styled.div``
