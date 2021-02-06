import React, { ReactChild, ReactElement } from 'react'
import { AppLayout } from '../../layout'

type Props = {
  children: ReactChild | ReactChild[]
}

const MainView = (props: Props): ReactElement => {
  const { children } = props
  return <AppLayout>{children}</AppLayout>
}

export default MainView
