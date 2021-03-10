import { COLOR } from '@src/styling'
import React, { ReactElement } from 'react'
import { CardWrapper } from './style'

type Props = {
  width?: number
  height?: number
  bgColor?: string
  children: Array<ReactElement>
}

const FixedCard = (props: Props): ReactElement => {
  const { width, height, bgColor, children, ...rest } = props
  return (
    <CardWrapper width={width} height={height} color={bgColor}>
      {children.map((child: ReactElement) => child)}
    </CardWrapper>
  )
}

export default FixedCard
