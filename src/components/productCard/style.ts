import { Avatar, Card, CardMedia } from '@material-ui/core'
import { MEDIA_BREAK } from '@src/layout'
import styled from 'styled-components'

export const CardWrapper = styled(Card)`
  &.MuiCard-root {
    width: 345px;
    margin: 10px;
  }
  @media (max-width: ${MEDIA_BREAK}px) {
    &.MuiCard-root {
      width: 300px;
      margin: 10px;
    }
  }
`

export const MediaWrapper = styled(CardMedia)`
  &.MuiCardMedia-root {
    height: 180px;
  }
`

type AvatarProps = {
  color: string
}

export const AvatarWrapper = styled(Avatar)`
  &.MuiAvatar-root {
    position: relative;
    top: -35px;
    margin-left: auto;
    background: ${(props: AvatarProps) => props.color};
  }
`
