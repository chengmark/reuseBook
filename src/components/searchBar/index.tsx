import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const SearchBar = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <>
      <div>Search Bar</div>
      {children}
    </>
  )
}

export default SearchBar
