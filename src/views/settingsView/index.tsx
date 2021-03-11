import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const SettingsView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return <div {...rest}>{children}</div>
}

export default SettingsView
