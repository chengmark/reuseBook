import ProductTile from '@src/components/productTile'
import SearchBar from '@src/components/searchBar'
import BookService from '@src/services/BookService'
import { getUrlLastSegmant } from '@src/utils'
import React, { ReactElement, useEffect, useState } from 'react'
import { FilterWrapper, ProductWrapper, ResultWrapper, Wrapper } from './style'

const ResultView = (): ReactElement => {
  const [books, setBooks] = useState<Array<any>>([])

  useEffect(() => {
    BookService.search(getUrlLastSegmant(), false)
      .then((res) => {
        setBooks(res.books as Array<any>)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Wrapper>
      <SearchBar />
      <ResultWrapper>
        <FilterWrapper></FilterWrapper>
        <ProductWrapper>
          {books.map((book) => (
            <ProductTile book={book} key={book._id} />
          ))}
        </ProductWrapper>
      </ResultWrapper>
    </Wrapper>
  )
}

export default ResultView
