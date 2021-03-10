import Footer from '@src/components/footer'
import { MainLayout } from '@src/layout'
import React, { ReactElement } from 'react'
import MainContent from './mainContent'
import MainHeader from './mainHeader'

type Props = {
  children?: ReactElement
}

const MainView = (props: Props): ReactElement => {
  const { ...rest } = props
  return (
    <>
      <MainHeader></MainHeader>
      <MainContent></MainContent>
      <Footer></Footer>
    </>
  )
}

export default MainView
