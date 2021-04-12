import { COLOR } from '@src/styling'
import styled from 'styled-components'
import RepeatIcon from '@material-ui/icons/Repeat'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined'
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import { MEDIA_BREAK } from '@src/layout'
import { IconButton } from '@material-ui/core'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 20px;
  background: ${COLOR.bg.light};
  padding: 10px 15px 10px 15px;
  max-width: 90%;
  min-width: 1200px;
`

export const ImageWrapper = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  cursor: pointer;
`

export const Image = styled.img`
  max-width: 250px;
  @media (max-width: ${MEDIA_BREAK}px) {
    max-width: 128px;
  }
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
`

export const OperationSection = styled.div`
  display: flex;
  margin-left: auto;
  align-items: start;
`

export const ReviewBtn = styled(IconButton)``

export const ProductTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  width: 100%;
  cursor: pointer;
  &:hover {
    color: ${COLOR.secondary.shade1};
  }
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2.5px 0 2.5px 0;
  width: fit-content;
  align-items: center;
`

export const InfoText = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  margin-right: 5px;
  color: ${COLOR.font.grey};
  word-break: break-word;
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
