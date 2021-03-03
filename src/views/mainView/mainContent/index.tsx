import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const MainContent = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <>
      <div>Main Content</div>
      {children}
    </>
  )
}

export default MainContent
