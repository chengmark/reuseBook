import { CenteredLayout } from '@src/layout'
import React, { ReactElement } from 'react'
import { Wrapper, Container, MessageWrapper, InputWrapper } from './style'

const ChatView = (): ReactElement => {
  return (
    <CenteredLayout>
      <Wrapper>
        <Container>
          <MessageWrapper></MessageWrapper>
          <InputWrapper></InputWrapper>
        </Container>
      </Wrapper>
    </CenteredLayout>
  )
}

export default ChatView
