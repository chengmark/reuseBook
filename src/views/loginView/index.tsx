import { CenteredLayout } from '@src/layout'
import React, { ReactElement, useState } from 'react'
import LoginForm from './loginForm'
import ResetPwForm from './resetPwForm'
import SignupForm from './signupForm'
import { Container, Wrapper, LinkText } from './style'

type Props = {
  children?: ReactElement
}

export const LOGIN = 1
export const SIGNUP = 2
export const RESET_PW = 3

const LoginView = (props: Props): ReactElement => {
  const { children } = props
  const [operation, setOperation] = useState(LOGIN)

  return (
    <CenteredLayout>
      {operation === LOGIN && (
        <Wrapper>
          <LoginForm setOperation={setOperation}></LoginForm>
        </Wrapper>
      )}
      {operation === SIGNUP && (
        <Wrapper>
          <SignupForm setOperation={setOperation}></SignupForm>
        </Wrapper>
      )}
      {operation === RESET_PW && (
        <Wrapper>
          <ResetPwForm setOperation={setOperation}></ResetPwForm>
        </Wrapper>
      )}
    </CenteredLayout>
  )
}

export default LoginView
