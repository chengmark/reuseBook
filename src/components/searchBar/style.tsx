import { IconButton, TextField } from '@material-ui/core'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

type Props = {
  focused: boolean
}

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 20px);
  margin: 0 10px 12px 10px;
  background: #f0f1f1;
  border-radius: 10px;
  transition: 0.2s;
  ${(props: Props) =>
    props.focused &&
    ` box-shadow: 0 0 0 4px ${COLOR.secondary.tint1}, inset 0 0 0 1px ${COLOR.secondary.main}; background: ${COLOR.bg.light}`}
`

export const Input = styled(TextField)`
  &.MuiFormControl-root {
    width: 100%;
    & .MuiOutlinedInput-root > fieldset {
      height: 100%;
      border: 0px;
    }
  }
`

export const Btn = styled(IconButton)`
  &.MuiIconButton-root {
    background: ${COLOR.secondary.tint2};
    color: ${COLOR.font.dark};
    border-radius: 10px;
  }

  &.MuiIconButton-root:hover {
    background: ${COLOR.secondary.main};
  }
`
