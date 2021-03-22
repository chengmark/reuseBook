import React, { ReactElement, useState } from 'react'
import { ScrollableList, ContentContainer, Tag } from '../style'

const MainContent = (): ReactElement => {
  // const classes = useStyles()
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
