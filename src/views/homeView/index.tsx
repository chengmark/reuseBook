require('dotenv').config()
import { categories } from '@common/categories'
import Carousel from '@src/components/carousel'
import ProductCard from '@src/components/productCard/productCard'
import ProductSkeleton from '@src/components/productCard/productSkeleton'
import SearchBar from '@src/components/searchBar'
import { useUserState } from '@src/context/UserContext'
import BookService from '@src/services/BookService'
import React, { ReactElement, useEffect, useState } from 'react'
import { HomeWrapper, ProductRow } from './style'

const HomeView = (): ReactElement => {
  const [suggestions, setSuggestions] = useState<Array<any>>()
  const [loading, setLoading] = useState(true)
  const { loggedIn, state } = useUserState()
  useEffect(() => {
    const interestIds = loggedIn() ? (state.interests as Array<any>).map((interest) => interest._id) : []
    BookService.listSuggestions(interestIds)
      .then((res) => {
        setLoading(false)
        setSuggestions(res as Array<any>)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])
  const AWS_S3_URL = `https://csci3100-a6-reuse-book.s3-ap-southeast-1.amazonaws.com/`

  const getSlides = () => {
    const slides: Array<any> = []
    categories.forEach((category) => {
      slides.push({ img: `${AWS_S3_URL + category.name}.png`, keyword: category.name })
    })
    return slides
  }

  return (
    <HomeWrapper>
      <SearchBar></SearchBar>
      <Carousel slides={getSlides()}></Carousel>
      <ProductRow>
        {!loading && suggestions?.map((suggestion) => <ProductCard key={suggestion._id} book={suggestion} />)}
        {loading && new Array(6).fill(0).map((e, i) => <ProductSkeleton key={i} />)}
      </ProductRow>
    </HomeWrapper>
  )
}

export default HomeView
