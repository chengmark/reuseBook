import { Obj } from '@myTypes/Obj'
import { Tab, Tabs } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { Card, TabPanel } from '../style'
import ListingTab from './listingTab'
import OfferTab from './offerTab'

const MainCard = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (e: ChangeEvent<Obj>, newTab: number) => {
    setCurrentTab(newTab)
  }

  return (
    <Card>
      <Tabs value={currentTab} variant="fullWidth" onChange={handleTabChange} indicatorColor="primary" centered>
        <Tab label="Listing"></Tab>
        <Tab label="Offers"></Tab>
      </Tabs>
      <ListingTab currentTab={currentTab} index={0} />
      <OfferTab currentTab={currentTab} index={1} />
    </Card>
  )
}

export default MainCard
