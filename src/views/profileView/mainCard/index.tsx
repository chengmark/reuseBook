import { Obj } from '@myTypes/Obj'
import { Tab, Tabs } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Card } from '../style'

type Props = {
  children?: ReactElement
}

const MainCard = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (e: ChangeEvent<Obj>, newTab: number) => {
    setCurrentTab(newTab)
  }

  return (
    <Card>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Sale"></Tab>
        <Tab label="Order"></Tab>
        <Tab label="History"></Tab>
      </Tabs>
    </Card>
  )
}

export default MainCard
