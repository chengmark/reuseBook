import { GridList, GridListTile } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { ScrollableList, ContentContainer, useStyles, Tag } from '../style'

type Props = {
  children?: ReactElement
}

const MainContent = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const classes = useStyles()
  const [categories, setCategories] = useState([
    'Math',
    'Computer',
    'Travel',
    'English',
    'Chinese',
    'UGFH',
    'UGFN',
    'Novel',
    'Sci-fi',
    'Science',
    'History',
  ])

  return (
    <ContentContainer>
      <ScrollableList>
        {categories.map((category) => (
          <Tag key={category}>{category}</Tag>
        ))}
      </ScrollableList>
    </ContentContainer>
  )
}

export default MainContent
