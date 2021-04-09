import { Divider } from '@material-ui/core'
import ProductCard from '@src/components/productCard/productCard'
import React, { ReactElement } from 'react'
import { SubContainer, Container, FlexFullRow, Title } from '../style'

type Props = {
  children?: ReactElement
}

const RecommendationSection = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <Container>
      <FlexFullRow>
        <Title>Recommendations</Title>
      </FlexFullRow>
      <Divider />
      <SubContainer center>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
        <ProductCard image="https://media.newyorker.com/photos/59ee325f1685003c9c28c4ad/master/w_2560%2Cc_limit/Heller-Kirkus-Reviews.jpg"></ProductCard>
      </SubContainer>
      {children}
    </Container>
  )
}

export default RecommendationSection
