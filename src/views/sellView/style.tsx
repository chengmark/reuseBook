import { Button } from '@material-ui/core'
import { COLOR } from '@src/styling'
import styled from 'styled-components'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${COLOR.bg.light};
  border: 1px solid ${COLOR.divider.dark};
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
  width: 75%;
`

export const CoverPhoto = styled.div`
  width: 90%;
  height: fit-content;
`
export const BtnRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
