import React, { ChangeEvent, ReactElement, useState } from 'react'
import { BarWrapper, Btn, Input } from './style'
import SearchIcon from '@material-ui/icons/Search'
import BookService from '@src/services/BookService'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'

type Props = {
  callback?: () => void
}

const SearchBar = ({ callback }: Props): ReactElement => {
  const [focused, setFocused] = useState(false)
  const [keyword, setKeyword] = useState('')
  const history = useHistory()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleBtnOnClick = () => {
    if (!keyword) setKeyword('*')
    history.push(toPath(LOCATIONS.search, !keyword ? '*' : keyword))
    if (callback) callback()
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
