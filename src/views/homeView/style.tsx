import { makeStyles } from '@material-ui/core'
import { MEDIA_BREAK } from '@src/layout'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

export const useStyles = makeStyles(() => ({}))

export const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 25px 15px 25px;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 0px 10px 5px 10px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ScrollableList = styled.div`
  overflow: auto;
  white-space: nowrap;
`

export const Tag = styled.a`
  display: inline-block;
  padding: 2.5px 10px 2.5px 10px;
  margin: 0px 5px 0px 5px;
  border-radius: 15px;
  background: ${COLOR.primary.tint1};
`
