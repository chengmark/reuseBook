import SearchBar from '@src/components/searchBar'
import React, { ReactElement } from 'react'
import { HeaderContainer } from './style'

type Props = {
  // children?: ReactElement
}

const MainHeader = (props: Props): ReactElement => {
  // const { children } = props
  return (
    <HeaderContainer>
      <SearchBar></SearchBar>
    </HeaderContainer>
  )
}

export default MainHeader
