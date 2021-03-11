import { makeStyles } from '@material-ui/core'
import { MEDIA_BREAK } from '@src/layout'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

const SECOND_COLUMN_MIN_WIDTH = 380
const SECOND_COLUMN_MAX_WIDTH = 440

export const useStyles = makeStyles(() => ({
  avatar: {
    width: '96px',
    height: '96px',
    border: '2px solid white',
    fontSize: '48px',
  },
  button: {
    margin: '5px 10px 5px 10px',
    background: COLOR.primary.shade1,
    color: COLOR.primary.tint1,
    '&:hover': {
      background: COLOR.primary.shade2,
    },
  },
  chip: {
    background: COLOR.primary.tint1,
    color: COLOR.primary.shade1,
    border: `1px solid ${COLOR.primary.shade1}`,
    margin: '2.5px 5px 2.5px 5px',
  },
}))

type Props = {
  coverPhoto?: string // path of the cover photo
}

export const ProfileLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(${SECOND_COLUMN_MIN_WIDTH}px, ${SECOND_COLUMN_MAX_WIDTH}px) 1fr;
  grid-template-areas: 'secondary main';
`

/* second col on left, main col on right (desktop version)
┌──┬───────────┐
│xx│     xx    │
│  │           │
│xx│     xx    │
│  │           │
│xx│     xx    │
└──┴───────────┘
*/

export const SecondaryColumn = styled.div`
  grid-area: secondary;
  display: flex;
  flex-direction: column;
  padding: 24px;
`
export const MainColumn = styled.div`
  grid-area: main;
  display: flex;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLOR.bg.light};
  border-radius: 5px;
  border: 1px solid ${COLOR.divider.light};
  margin-bottom: 15px;
`

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -48px;
`

export const CoverPhoto = styled.div`
  ${(props: Props) => `
    width: 100%;
    height: 124px;
    background: ${props.coverPhoto ?? COLOR.bg.dark}
  `}
`

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`

export const Name = styled.div`
  font-weight: 800;
  color: ${COLOR.font.dark};
  font-size: 24px;
`

export const Username = styled.div`
  color: ${COLOR.font.grey};
  font-size: 18px;
`

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${COLOR.divider.light};
  margin: 5px 0 5px 0;
`

export const InterestTitle = styled.div`
  font-weight: 700;
  color: ${COLOR.font.dark};
  font-size: 16px;
`

export const InterestContainer = styled.div`
  display: inline-block;
`
