import React, { ReactElement } from 'react'
import { Wrapper, ImageWrapper, InfoSection, Image, ProductTitle } from './style'

type Props = {
  book: any
}

const ProductTile = (props: Props): ReactElement => {
  const { book, ...rest } = props
  return (
    <Wrapper>
      <ImageWrapper>
        <Image />
      </ImageWrapper>
      <InfoSection>
        <ProductTitle>{book.title}</ProductTitle>
      </InfoSection>
    </Wrapper>
  )
}
export default ProductTile
