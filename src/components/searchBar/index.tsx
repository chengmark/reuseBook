import React, { ChangeEvent, ReactElement, useState } from 'react'
import { BarWrapper, Btn, Input } from './style'
import SearchIcon from '@material-ui/icons/Search'
import BookService from '@src/services/BookService'

const SearchBar = (): ReactElement => {
  const [focused, setFocused] = useState(false)
  const [keyword, setKeyword] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleBtnOnClick = () => {
    BookService.search(keyword, false)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
        value={keyword}
        onChange={handleInputChange}
      ></Input>
      <Btn onClick={handleBtnOnClick}>
        <SearchIcon />
      </Btn>
    </BarWrapper>
  )
}

export default SearchBar
