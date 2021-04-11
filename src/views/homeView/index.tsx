import Carousel from '@src/components/carousel'
import ProductCard from '@src/components/productCard/productCard'
import SearchBar from '@src/components/searchBar'
import React, { ReactElement, useEffect } from 'react'
import { HomeWrapper, ProductRow } from './style'

const HomeView = (): ReactElement => {
  // useEffect(() => {}, [])

  return (
    <HomeWrapper>
      <SearchBar></SearchBar>
      <Carousel slides={[{ img: '' }, { img: '' }]}></Carousel>
      <ProductRow>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
      </ProductRow>
    </HomeWrapper>
  )
}

export default HomeView
