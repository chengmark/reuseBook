require('dotenv').config()
import { categories } from '@common/categories'
import Carousel from '@src/components/carousel'
import ProductCard from '@src/components/productCard/productCard'
import SearchBar from '@src/components/searchBar'
import { capFirst } from '@src/utils'
import React, { ReactElement, useEffect, useState } from 'react'
import { HomeWrapper, ProductRow } from './style'

const HomeView = (): ReactElement => {
  // useEffect(() => {

  // }, [])
  console.log(process.env)
  const AWS_S3_URL = `https://${process.env.REACT_APP_S3_BUCKET_NAME}.s3-ap-southeast-1.amazonaws.com/`

  const getSlides = () => {
    const slides: Array<any> = []
    categories.forEach((category) => {
      slides.push({ img: `${AWS_S3_URL + category.name}.png` })
    })
    return slides
  }

  return (
    <HomeWrapper>
      <SearchBar></SearchBar>
      <Carousel slides={getSlides()}></Carousel>
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
