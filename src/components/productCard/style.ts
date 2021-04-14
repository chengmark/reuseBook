import { Avatar, Card, CardContent, CardMedia, IconButton } from '@material-ui/core'
import { MEDIA_BREAK } from '@src/layout'
import RepeatIcon from '@material-ui/icons/Repeat'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined'
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import styled from 'styled-components'
import { COLOR } from '@src/styling'

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
export const ProductTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  width: 100%;
  cursor: pointer;
  &:hover {
    color: ${COLOR.secondary.shade1};
  }
  @media (max-width: ${MEDIA_BREAK}px) {
    font-size: 16px;
    line-height: 20px;
  }
`
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2.5px 0 2.5px 0;
  width: fit-content;
  align-items: center;
  flex-wrap: wrap;
`

export const InfoText = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  margin-right: 5px;
  color: ${COLOR.font.grey};
  word-break: break-word;
  @media (max-width: ${MEDIA_BREAK}px) {
    font-size: 12px;
    line-height: 16px;
  }
`

export const HighlightText = styled.div`
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: ${COLOR.secondary.shade1};
  margin-left: -2.5px;
  margin: 0 5px 0 -2.5px;
  @media (max-width: ${MEDIA_BREAK}px) {
    font-size: 16px;
  }
`

export const TradeIcon = styled(RepeatIcon)`
  color: ${COLOR.secondary.shade1};
  &.MuiSvgIcon-root {
    font-size: 22px;
    @media (max-width: ${MEDIA_BREAK}px) {
      font-size: 18px;
    }
  }
`

export const SellIcon = styled(AttachMoneyIcon)`
  color: ${COLOR.secondary.shade1};
  &.MuiSvgIcon-root {
    font-size: 22px;
    @media (max-width: ${MEDIA_BREAK}px) {
      font-size: 18px;
    }
  }
`

export const ConditionIcon = styled(LabelOutlinedIcon)`
  margin-right: 3px;
  &.MuiSvgIcon-root {
    font-size: 18px;
    @media (max-width: ${MEDIA_BREAK}px) {
      display: none;
    }
  }
  color: ${COLOR.font.grey};
`

export const CategoryIcon = styled(CategoryOutlinedIcon)`
  margin-right: 3px;
  &.MuiSvgIcon-root {
    font-size: 18px;
    @media (max-width: ${MEDIA_BREAK}px) {
      display: none;
    }
  }
  color: ${COLOR.font.grey};
`

export const TimeIcon = styled(CalendarTodayOutlinedIcon)`
  margin-right: 3px;
  &.MuiSvgIcon-root {
    font-size: 18px;
    @media (max-width: ${MEDIA_BREAK}px) {
      display: none;
    }
  }
  color: ${COLOR.font.grey};
`

export const ReviewIcon = styled(CommentOutlinedIcon)`
  margin-right: 3px;
  &.MuiSvgIcon-root {
    font-size: 18px;
  }
  color: ${COLOR.font.grey};
`
export const ReviewBtn = styled(IconButton)`
  &.MuiButtonBase-root {
    margin-top: auto;
    justify-content: start;
    padding: 0px;
  }
`

export const ContentWrapper = styled(CardContent)`
  &.MuiCardContent-root {
    min-height: 180px;
    display: flex;
    flex-direction: column;
  }
`
