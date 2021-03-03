import Footer from '@src/components/footer'
import SearchBar from '@src/components/searchBar'
import { MainLayout } from '@src/layout'
import React, { ReactElement } from 'react'
import MainContent from './mainContent'

type Props = {
  children?: ReactElement
}

const MainView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <MainLayout>
      <SearchBar></SearchBar>
      <MainContent></MainContent>
      <Footer></Footer>
    </MainLayout>
  )
}

export default MainView
