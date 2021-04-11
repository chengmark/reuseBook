import { Obj } from '@myTypes/Obj'
import { Tab, Tabs } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Card, TabPanel } from '../style'
import ListingTab from './listingTab'

const MainCard = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (e: ChangeEvent<Obj>, newTab: number) => {
    setCurrentTab(newTab)
  }

  return (
    <Card>
      <Tabs value={currentTab} variant="fullWidth" onChange={handleTabChange} indicatorColor="primary" centered>
        <Tab label="Listing"></Tab>
        <Tab label="Messages"></Tab>
        <Tab label="Orders"></Tab>
      </Tabs>
      <ListingTab currentTab={currentTab}></ListingTab>
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
