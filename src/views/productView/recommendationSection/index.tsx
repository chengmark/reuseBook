import { Divider } from '@material-ui/core'
import ProductCard from '@src/components/productCard/productCard'
import { useUserState } from '@src/context/UserContext'
import BookService from '@src/services/BookService'
import React, { ReactElement, useEffect, useState } from 'react'
import { SubContainer, Container, FlexFullRow, Title } from '../style'

type Props = {
  exclude: string // bookid
  ready: boolean
  callback: () => any
}

const RecommendationSection = ({ exclude, ready, callback }: Props): ReactElement => {
  const [suggestions, setSuggestions] = useState<Array<any>>()
  const { loggedIn, state } = useUserState()
  useEffect(() => {
    if (ready) {
      const interestIds = loggedIn() ? (state.interests as Array<any>).map((interest) => interest._id) : []
      BookService.listSuggestions(interestIds, exclude)
        .then((res) => {
          setSuggestions(res as Array<any>)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [ready, exclude])

  return (
    <Container>
      <FlexFullRow>
        <Title>Recommendations</Title>
      </FlexFullRow>
      <Divider />
      <SubContainer center>
        {suggestions?.map((suggestion) => (
          <ProductCard key={suggestion._id} book={suggestion} callback={callback} />
        ))}
      </SubContainer>
    </Container>
  )
}

export default RecommendationSection
