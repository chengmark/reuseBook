import SearchBar from '@src/components/searchBar'
import React, { ReactElement } from 'react'
import { HomeWrapper } from './style'

const HomeView = (): ReactElement => {
  return (
    <HomeWrapper>
      <SearchBar></SearchBar>
    </HomeWrapper>
  )
}

export default HomeView
