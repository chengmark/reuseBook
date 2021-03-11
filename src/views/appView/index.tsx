import React, { ReactChild, ReactElement } from 'react'
import { AppLayout } from '@src/layout'

type Props = {
  children?: ReactChild | ReactChild[]
}

const AppView = (props: Props): ReactElement => {
  const { children } = props
  return <AppLayout>{children}</AppLayout>
}

export default AppView
