import React, { ReactElement } from 'react'
import Content from './content'
import Header from './header'
import { HomeLayout } from './style'

type Props = {
  children?: ReactElement
}

const HomeView = (props: Props): ReactElement => {
  const { ...rest } = props
  return (
    <HomeLayout>
      <Header></Header>
      <Content></Content>
    </HomeLayout>
  )
}

export default HomeView
