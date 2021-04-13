import { Button, Divider, TextField, Select, FormControl } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { MEDIA_BREAK, NAV_WIDTH } from '@src/layout'
import { Autocomplete } from '@material-ui/lab'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

type IsMobileProps = {
  isMobile?: boolean
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: ${COLOR.bg.light};
  height: 100%;
`

export const ProductWrapper = styled.div`
  display; flex;
  flex-direction: column;
  width: 100%;
  flex: 4;
`

export const OperationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px 0 10px 15px;
  padding: 0 15px 0 0;
  border-right: 1px solid ${COLOR.divider.light};
  @media (max-width: ${MEDIA_BREAK}px) {
    display: ${(props: IsMobileProps) => (props.isMobile ? `flex` : `none`)};
  }
`

export const FilterTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin: 5px 0 5px 0;
`

type SeparatorProprs = {
  isBook?: boolean
}

export const Separator = styled(Divider)`
  &.MuiDivider-root {
    margin: ${(props: SeparatorProprs) => (props.isBook ? `10px 10px 10px 10px` : `10px 0 10px 0`)};
  }
`
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0 5px 0;
`

export const PriceInput = styled(TextField)`
  &.MuiTextField-root > .MuiInputBase-root > input {
    padding: 10px;
  }
`

export const PriceBtn = styled(Button)`
  &.MuiButton-root {
    font-weight: 500;
    color: ${COLOR.font.dark};
    background: ${COLOR.secondary.tint2};
    &:hover {
      background: ${COLOR.secondary.main};
    }
  }
`

type LinkProps = {
  persist?: boolean
}

export const SuggestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`

export const SuggestionText = styled.div`
  font-size: ${(props: LinkProps) => (props.persist ? `15px` : `18px`)};
`

export const SuggestionLink = styled.a`
  text-decoration: none;
  color: ${COLOR.primary.shade2};
  margin: 5px 0 5px 0;
  width: fit-content;
  cursor: ${(props: LinkProps) => (props.persist ? `pointer` : ``)};
  font-style: italic;
`

export const SelectControl = styled(FormControl)`
  &.MuiFormControl-root {
    margin-left: auto;
  }
`

export const SelectInput = styled(Select)`
  &.MuiInputBase-root > .MuiSelect-root {
    padding: 5px 30px 5px 20px;
  }
`

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 20px;
  //   background: ${COLOR.bg.light};
  padding: 10px 15px 10px 15px;
  width: 100%;
  height: 175px;
`

export const SkeletonImageWrapper = styled.div`
  width: 250px;
  height: 155px;
`

export const SkeletonImage = styled(Skeleton)`
  &.MuiSkeleton-root {
    flex: 2;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    height: 167%;
    top: -55px;
    @media (max-width: ${MEDIA_BREAK}px) {
      width: 128px !important;
    }
  }
`

export const SkeletonInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
`

export const SkeletonText = styled(Skeleton)`
  &.MuiSkeleton-root {
    margin: 5px 0 5px 0;
  }
`

export const NoBookFoundText = styled.div`
  width: 100%;
  text-align: center;
  color: ${COLOR.font.grey};
`

export const PreResultRow = styled.div`
  display: ${(props: IsMobileProps) => (props.isMobile ? `none` : `flex`)};
  flex-drection: row;
  width: calc(100% - 20px);
  background: ${COLOR.bg.light};
  padding: 10px;
  justify-content: space-between;
  @media (max-width: ${MEDIA_BREAK}px) {
    display: ${(props: IsMobileProps) => (props.isMobile ? `flex` : `flex`)};
    justify-content: ${(props: IsMobileProps) => (props.isMobile ? `start` : `space-between`)};
    border-bottom: ${(props: IsMobileProps) => (props.isMobile ? `1px solid ${COLOR.divider.light}` : ``)};
    flex-wrap: nowrap;
    overflow-x: auto;
    width: calc(100vw - 20px);
  }
`

export const MobileSelect = styled(FormControl)`
  &.MuiFormControl-root {
    flex: 0 0 auto;
    margin: 0 2px 0 2px;
  }
`

export const MobileSelectInput = styled(Select)`
  &.MuiInputBase-root > .MuiSelect-root {
    padding: 5px 30px 5px 20px;
  }
`
