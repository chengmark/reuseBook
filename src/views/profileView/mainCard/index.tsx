import { Obj } from '@myTypes/Obj'
import { Tab, Tabs } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Card, TabPanel } from '../style'
import { useStyles } from '@src/views/profileView/style'
import SaleTab from './saleTab'

type Props = {
  children?: ReactElement
}

const MainCard = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const [currentTab, setCurrentTab] = useState(0)
  const classes = useStyles()

  const handleTabChange = (e: ChangeEvent<Obj>, newTab: number) => {
    setCurrentTab(newTab)
  }

  return (
    <Card>
      <Tabs value={currentTab} variant="fullWidth" onChange={handleTabChange} indicatorColor="primary" centered>
        <Tab label="Sale"></Tab>
        <Tab label="Order"></Tab>
        <Tab label="History"></Tab>
      </Tabs>
      <SaleTab currentTab={currentTab}></SaleTab>
      <TabPanel currentTab={currentTab} index={1}>
        Order tab
      </TabPanel>
      <TabPanel currentTab={currentTab} index={2}>
        history tab
      </TabPanel>
    </Card>
  )
}

export default MainCard
