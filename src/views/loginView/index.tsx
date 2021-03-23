import { CenteredLayout } from '@src/layout'
import React, { ReactElement, useState } from 'react'
import LoginForm from './loginForm'
import ResetPwForm from './resetPwForm'
import SignupForm from './signupForm'
import { Wrapper } from './style'

export const LOGIN = 1
export const SIGNUP = 2
export const RESET_PW = 3

const LoginView = (): ReactElement => {
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
