import React, { ReactElement, useState } from 'react'
import { BarWrapper, Btn, Input } from './style'
import SearchIcon from '@material-ui/icons/Search'

const SearchBar = (): ReactElement => {
  const [focused, setFocused] = useState(false)

  return (
    <BarWrapper focused={focused}>
      <Input
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        variant="outlined"
        placeholder="Search for a book"
      ></Input>
      <Btn>
        <SearchIcon />
      </Btn>
    </BarWrapper>
  )
}

export default SearchBar
