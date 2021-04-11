import { Avatar, Button, Card } from '@material-ui/core'
import RepeatIcon from '@material-ui/icons/Repeat'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import { MEDIA_BREAK, NAV_WIDTH } from '@src/layout'
import styled from 'styled-components'
import { COLOR } from '@src/styling'

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Container = styled(Card)`
  &.MuiCard-root {
    display: flex;
    flex-direction: column;
    margin: 0 10px 10px 10px;
    width: calc(100% - ${NAV_WIDTH}px);
    padding: 20px;
    max-width: 1280px;
  }
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 20px;
  @media (max-width: ${MEDIA_BREAK}px) {
    flex-direction: column;
  }
`

type ImageProps = {
  img: string
}

export const ImageWrapper = styled.div`
  flex: 1;
  cursor: pointer;
`

export const Image = styled.div`
  background: no-repeat url(${(props: ImageProps) => props.img}) 50% / 100%;
  // background-size: contain;
  // background-repeat: no-repeat;
`

export const InfoTextSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Title = styled.div`
  word-break: break-word;
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
`

export const Href = styled.a`
  text-decoration: none;
  color: ${COLOR.primary.shade2};
  margin: 5px 0 5px 0;
  width: fit-content;
  cursor: pointer;
`

export const TradeIcon = styled(RepeatIcon)`
  color: ${COLOR.secondary.shade1};
`

export const SellIcon = styled(AttachMoneyIcon)`
  color: ${COLOR.secondary.shade1};
`

export const ConditionIcon = styled(LabelOutlinedIcon)`
  margin-right: 3px;
  color: ${COLOR.font.grey};
`

export const DescriptionIcon = styled(DescriptionOutlinedIcon)`
  margin-right: 3px;
  color: ${COLOR.font.grey};
  margin-bottom: auto;
`

export const CategoryIcon = styled(CategoryOutlinedIcon)`
  margin-right: 3px;
  color: ${COLOR.font.grey};
`

export const TimeIcon = styled(CalendarTodayOutlinedIcon)`
  margin-right: 3px;
  color: ${COLOR.font.grey};
`

export const Highlighted = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${COLOR.secondary.shade1};
`

export const ConditionText = styled.div`
  color: ${COLOR.font.grey};
`

export const TimeText = styled.div`
  color: ${COLOR.font.grey};
`

export const DescriptionText = styled.div`
  padding: 5px 0 0px 0;
  color: ${COLOR.font.grey};
`

export const ChatBtn = styled(Button)`
  &.MuiButton-root {
    margin: 5px 0 5px 0;
    background: ${COLOR.secondary.shade1};
    color: ${COLOR.font.light};
    &:hover {
      background: ${COLOR.secondary.shade2};
    }
  }
`

export const ShareBtn = styled(Button)`
  &.MuiButton-root {
    margin: 5px 0 5px 0;
    background: ${COLOR.primary.shade1};
    color: ${COLOR.font.light};
    &:hover {
      background: ${COLOR.primary.shade2};
    }
  }
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  padding: 5px 0 5px 0;
`

export const FlexFullRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px 0 5px 0;
`

export const MinorText = styled.div`
  font-size: 14px;
  color: ${COLOR.font.grey};
  margin-left: auto;
  padding: 5px 0 0 0;
`

export const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px 5px 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid ${COLOR.divider.light};
  width: fit-content;
  min-width: 120px;
`

export const ReviewerAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    margin: 5px;
  }
`

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  @media (max-width: ${MEDIA_BREAK}px) {
    flex-direction: column;
  }
`

export const ReviewText = styled.div`
  align-self: center;
  @media (max-width: ${MEDIA_BREAK}px) {
    align-self: auto;
  }
`

type SubContainerProps = {
  center?: boolean
}

export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props: SubContainerProps) => (props.center ? `center` : ``)};
`

export const NoReviewText = styled.div`
  font-size: 16px;
  color: ${COLOR.font.grey};
  margin: 10px 0 10px 0;
  align-self: center;
  text-align: center;
`
