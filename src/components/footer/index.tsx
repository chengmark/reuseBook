import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const Footer = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <>
      <div>Footer</div>
      {children}
    </>
  )
}

export default Footer
