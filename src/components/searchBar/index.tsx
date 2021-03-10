import { makeStyles } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Input, SearchWrapper, Submit, Select } from './style'

type Props = {
  children?: ReactElement
}

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid white',
  },
  focusedForm: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid orange',
  },
  select: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))

const SearchBar = (props: Props): ReactElement => {
  const [input, setInput] = useState('')
  const [scope, setScope] = useState('All')
  const [isFocus, setIsFocus] = useState(false)
  const { ...rest } = props
  const classes = useStyles()

  const handleScopeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setScope(e.target.value)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const toggleFocus = () => {
    setIsFocus(!isFocus)
  }

  return (
    <SearchWrapper>
      <Select name="scope" value={scope} onChange={(e) => handleScopeChange(e as ChangeEvent<HTMLSelectElement>)}>
        <option value="ALL">All</option>
        <option value="Name">Name</option>
        <option value="Author">Author</option>
      </Select>
      <Input onChange={handleInputChange}></Input>
      <Submit>
        <SearchIcon></SearchIcon>
      </Submit>
    </SearchWrapper>
  )
}

export default SearchBar
