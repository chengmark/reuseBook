import { CardContent } from '@material-ui/core'
import { COLOR } from '@src/styling'
import React, { ReactElement } from 'react'
import { AvatarWrapper, CardWrapper, MediaWrapper } from './style'

type Props = {
  children?: ReactElement
  image: string // image url
}

const ProductCard = (props: Props): ReactElement => {
  const { children, image, ...rest } = props
  const getRandomColor = () => {
    return COLOR.avatar[Math.floor(Math.random() * 12)]
  }

  return (
    <CardWrapper>
      <MediaWrapper image={image} />
      <CardContent>
        <AvatarWrapper color={getRandomColor()}>A</AvatarWrapper>
      </CardContent>
    </CardWrapper>
  )
}

export default ProductCard
