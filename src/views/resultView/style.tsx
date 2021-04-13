import { Button, Divider, TextField, Select, FormControl } from '@material-ui/core'
import { NAV_WIDTH } from '@src/layout'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

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
`

export const FilterTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin: 5px 0 5px 0;
`
export const Separator = styled(Divider)`
  &.MuiDivider-root {
    margin: 10px 0 10px 0;
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
    color: ${COLOR.font.dark};
    background: ${COLOR.secondary.tint2};
    &:hover {
      background: ${COLOR.secondary.main};
    }
  }
`

export const PreResultRow = styled.div`
  display: flex;
  flex-drection: row;
  width: calc(100% - 20px);
  background: ${COLOR.bg.light};
  padding: 10px;
  justify-content: space-between;
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

export const SortControl = styled(FormControl)`
  &.MuiFormControl-root {
    margin-left: auto;
  }
`

export const SortSelect = styled(Select)`
  &.MuiInputBase-root > .MuiSelect-root {
    padding: 5px 30px 5px 20px;
  }
`
