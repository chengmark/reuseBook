import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const LoginView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return <>{children}</>
}

export default LoginView
