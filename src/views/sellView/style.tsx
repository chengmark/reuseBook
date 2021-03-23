import { Button, Chip, TextField } from '@material-ui/core'
import { COLOR } from '@src/styling'
import styled from 'styled-components'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import Autocomplete from '@material-ui/lab/Autocomplete'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${COLOR.bg.light};
  border: 1px solid ${COLOR.divider.dark};
`

type PositionProps = {
  center?: boolean
  direction?: 'row' | 'column'
}

type ActiveProps = {
  active: number // 0 | 1, boolean will cause error
}

type SizeProps = {
  width?: string
}

type BtnProps = {
  secondary?: boolean
}

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${COLOR.font.dark};
  text-align: ${(props: PositionProps) => (props.center ? `center` : ``)};
  margin: 15px 0 0 0;
`

export const StepContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
`

export const UploadArea = styled.button`
  width: calc(100% - 48px);
  height: 320px;
  background: ${COLOR.secondary.tint1};
  border: 1px dotted ${COLOR.secondary.shade1};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: 0;
  }
  grid-gap: 15px;
`

export const UploadButton = styled(Button)`
  &.MuiButton-root {
    background: ${COLOR.secondary.shade1};
    color: ${COLOR.font.light};
    &:hover {
      background: ${COLOR.secondary.shade2};
    }
  }
`

export const UploadIcon = styled(ImageOutlinedIcon)`
  &.MuiSvgIcon-root {
    color: ${COLOR.secondary.shade1};
    font-size: 48px;
  }
`

type UploadText = {
  isTitle?: boolean
}

export const UploadText = styled.div`
  color: ${COLOR.secondary.shade1};
  font-size: ${(props: UploadText) => (props.isTitle ? `24px` : `16px`)};
  font-weight: ${(props: UploadText) => (props.isTitle ? `500` : ``)};
`

export const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 48px);
  justify-content: center;
  align-items: center;
`

export const CoverPhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.secondary.tint1};
  border: 1px dotted ${COLOR.secondary.shade1};
  padding: 25px 0 10px 0;
  color: ${COLOR.secondary.shade1};
  line-height: 38px;
  width: ${(props: SizeProps) => (props.width ? props.width : `75%`)};
`

export const CoverPhoto = styled.div`
  width: 90%;
  height: fit-content;
`
export const BtnRow = styled.div`
  display: flex;
  flex-direction: row;
  ${(props: PositionProps) =>
    props.center
      ? `
  justify-content: center;
  align-items: center;
  `
      : ``}
`
export const Btn = styled(Button)`
  ${(props: BtnProps) =>
    props.secondary
      ? `&.MuiButton-root {
        margin: 5px 10px 5px 10px;
        background: ${COLOR.bg.light};
        color: ${COLOR.font.dark};
        border: 1px solid ${COLOR.divider.dark};
      }
      &.MuiButton-root:hover {
        background: ${COLOR.bg.grey};
      }`
      : `&.MuiButton-root {
    margin: 5px 10px 5px 10px;
    background: ${COLOR.primary.shade1};
    color: ${COLOR.primary.tint1};
  }
  &.MuiButton-root:hover {
    background: ${COLOR.primary.shade2};
  }`}
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: ${(props: PositionProps) => props.direction};
  width: calc(100% - 48px);
  ${(props: PositionProps) => (props.center ? `justify-centent: center; align-items: center;` : ``)}
`

export const CategoryInput = styled(Autocomplete)`
  &.MuiFormControl-root {
    margin: 0 0 10px 0;
  }
`

export const TextInput = styled(TextField)`
  &.MuiFormControl-root {
    margin: 0 0 10px 0;
  }
`

export const PriceType = styled(Chip)`
  &.MuiChip-root {
    background: ${(props: ActiveProps) => (props.active ? COLOR.primary.tint1 : COLOR.bg.light)};
    color: ${(props: ActiveProps) => (props.active ? COLOR.primary.shade1 : COLOR.font.grey)};
    border: 1px solid ${(props: ActiveProps) => (props.active ? COLOR.primary.shade1 : COLOR.divider.dark)};
    margin: 2.5px 5px 2.5px 5px;
    width: 64px;
    cursor: pointer;
    margin: 5px 5px 10px 5px;
    &:hover {
      background: ${COLOR.primary.tint1};
      color: ${COLOR.primary.shade1};
      border: 1px solid ${COLOR.primary.shade1};
    }
    &:focus {
      background: ${COLOR.primary.tint1};
    }
  }
`

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: SizeProps) => props.width ?? '100%'};
  padding: 20px;
`

export const DetailTitle = styled.div`
  font-weight: 600;
  display: inline-block;
`

export const TextRow = styled.div`
  width: 75%;
  margin: 5px 0 5px 0;
`
