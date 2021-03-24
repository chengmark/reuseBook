import { Avatar, Button, Chip, Dialog } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import EditIcon from '@material-ui/icons/Edit'
import { MEDIA_BREAK, NAV_WIDTH } from '@src/layout'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

const SECOND_COLUMN_MIN_WIDTH = 280
const SECOND_COLUMN_MAX_WIDTH = 440

const APP_VIEW_ROW_HEIGHT = 62

type Props = {
  coverPhoto?: string // path of the cover photo
}

export const ProfileLayout = styled.div`
  display: grid;
  width: calc(100% - 48px);
  grid-gap: 24px;
  padding: 0 24px 0 24px;
  grid-template-columns: minmax(${SECOND_COLUMN_MIN_WIDTH}px, ${SECOND_COLUMN_MAX_WIDTH}px) 1fr;
  grid-template-areas: 'secondary main';
  @media (max-width: ${MEDIA_BREAK}px) {
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100vw;
    height: calc(100vh - ${NAV_WIDTH}px);
    grid-gap: 0;
  }
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
  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`

export const AppViewRow = styled.div`
  display: none;
  @media (max-width: ${MEDIA_BREAK}px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 12px 0 12px;
    height: ${APP_VIEW_ROW_HEIGHT}px;
    width: calc(100vw - 24px);
    background: ${COLOR.bg.light};
  }
`

export const AppViewName = styled.div`
  font-weight: 700;
  color: ${COLOR.font.dark};
  font-size: 20px;
  margin: 0 5px 0 5px;
`

export const OutlinedBtn = styled(Button)`
  &.MuiButton-root {
    margin-left: auto;
  }
`

export const MainColumn = styled.div`
  grid-area: main;
  display: flex;
  @media (max-width: ${MEDIA_BREAK}px) {
    height: calc(100% - ${APP_VIEW_ROW_HEIGHT}px);
  }
`

export const UserAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 96px;
    height: 96px;
    border: 2px solid white;
    font-size: 48px;
  }
`

export const BookAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 64px;
    height: 64px;
    margin: 5px;
  }
`

export const Btn = styled(Button)`
  &.MuiButton-root {
    margin: 5px 10px 5px 10px;
    background: ${COLOR.primary.shade1};
    color: ${COLOR.primary.tint1};
  }
  &.MuiButton-root:hover {
    background: ${COLOR.primary.shade2};
  }
`

export const LogoutBtn = styled(Btn)`
  &.MuiButton-root {
    margin: 5px 10px 5px 10px;
    background: ${COLOR.error.tint};
    color: ${COLOR.font.light};
  }
  &.MuiButton-root:hover {
    background: ${COLOR.error.shade};
  }
`

type ChipProps = {
  selected: boolean
}

export const StyledChip = styled(Chip)`
  &.MuiChip-root {
    background: ${(props: ChipProps) => (props.selected ? COLOR.primary.tint1 : COLOR.bg.light)};
    color: ${(props: ChipProps) => (props.selected ? COLOR.primary.shade1 : COLOR.font.grey)};
    border: 1px solid ${(props: ChipProps) => (props.selected ? COLOR.primary.shade1 : COLOR.divider.dark)};
    margin: 2.5px 5px 2.5px 5px;
    &:hover {
      background: ${COLOR.primary.tint1};
      color: ${COLOR.primary.shade1};
      border: 1px solid ${COLOR.primary.shade1};
    }
    &:focus {
      background: ${(props: ChipProps) => (props.selected ? COLOR.primary.tint1 : COLOR.bg.light)};
    }
  }
`

export const StyledForwardIcon = styled(ArrowForwardIos)`
  &.MuiSvgIcon-root {
    margin-left: auto;
    color: ${COLOR.font.grey};
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${COLOR.bg.light};
  border-radius: 5px;
  border: 1px solid ${COLOR.divider.light};
  margin-bottom: 15px;
  width: 100%;
  @media (max-width: ${MEDIA_BREAK}px) {
    margin-bottom: 0;
  }
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
  display: flex;
  flex-direction: row;
  line-height: 26px;
`

export const PenIcon = styled(EditIcon)`
  &.MuiSvgIcon-root {
    margin-left: auto;
    cursor: pointer;
  }
`

export const InterestContainer = styled.div`
  display: inline-block;
`

type TabProps = {
  currentTab: number
  index: number
}

export const TabPanel = styled.div`
  ${(props: TabProps) => `
    display: ${props.currentTab !== props.index ? 'none' : 'block'};
    height: calc(100vh - 12px - 48px - 5px);
    overflow-y: auto;
  `}
`

export const Tile = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2.5px 5px 2.5px 5px;
  border-bottom: 1px solid ${COLOR.divider.dark};
  background: ${COLOR.bg.light};
  transition: 0.2s;
  &: hover {
    background: ${COLOR.hover.grey};
  }
`

export const TileInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`

export const TileTitle = styled.div`
  font-weight: 700;
  color: ${COLOR.font.dark};
  font-size: 18px;
`

export const TileDetails = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin: 10px;
  }
`
export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 0 2px 0 2px;
  }
`

export const CenteredTabPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const InterestDialog = styled(Dialog)``
