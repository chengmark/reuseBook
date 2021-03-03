import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const SlideShow = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return <>{children}</>
}

export default SlideShow
