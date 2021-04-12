import ProductTile from '@src/components/productTile'
import BookService from '@src/services/BookService'
import { getUrlLastSegmant } from '@src/utils'
import React, { ReactElement, useEffect, useState } from 'react'
import { FilterWrapper, Wrapper } from './style'

const ResultView = (): ReactElement => {
  const [books, setBooks] = useState<Array<any>>([])

  useEffect(() => {
    BookService.search(getUrlLastSegmant(), false)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Wrapper>
      <FilterWrapper></FilterWrapper>
      {books.map((book) => (
        <ProductTile book={book} key={book._id} />
      ))}
    </Wrapper>
  )
}

export default ResultView
