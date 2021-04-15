import { Button, IconButton, TextField } from '@material-ui/core'
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
  padding: 5px;
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
    flex: 9;
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

export const MessageWrapper = styled.div`
  background: ${COLOR.chatroom.grey};
  height: 600px;
  width: 100%;
  overflow-y: scroll;
  @media (max-width: ${MEDIA_BREAK}px) {
    height: 460px;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 5px 0 0 0;
`

export const Btn = styled(IconButton)`
  flex: 1;
`

type MessageProps = {
  isSender: boolean
}

export const MessageRow = styled.div`
  display: flex;
  justify-content: ${(props: MessageProps) => (props.isSender ? 'flex-end' : 'flex-start')};
  margin-top: 4px;
  margin-bottom: 4px;
`

export const MessageBubble = styled.div`
  padding: 12px 20px;
  background-color: ${(props: MessageProps) => (props.isSender ? `white` : `${COLOR.font.dark}`)};
  color: ${(props: MessageProps) => (props.isSender ? `${COLOR.font.dark}` : `${COLOR.font.light}`)};
  border-radius: 18px;
`
