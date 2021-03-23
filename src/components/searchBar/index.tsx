import React, { ReactElement } from 'react'
import { BarWrapper, Btn, Input } from './style'

const SearchBar = (): ReactElement => {
  return (
    <BarWrapper>
      <Input></Input>
      <Btn></Btn>
    </BarWrapper>
  )
}

export default SearchBar
