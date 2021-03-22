import { makeStyles } from '@material-ui/core'
import { MEDIA_BREAK } from '@src/layout'
import { COLOR } from '@src/styling'
import styled, { keyframes } from 'styled-components'

export const useStyles = makeStyles((theme) => ({
  textField: {
    margin: '10px 0px 10px 0px',
    width: 'fill-available',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: COLOR.primary.shade1,
      },
      '&.Mui-error fieldset': {
        borderColor: COLOR.error.shade,
      },
    },
  },
  button: {
    width: 'fill-available',
    margin: '10px 0px 10px 0px',
    background: COLOR.primary.shade1,
    '&:hover': {
      background: COLOR.primary.shade2,
    },
  },
}))

const fadeIn = keyframes`
  from {
    margin-top:300px;
    opacity: 0.1;
  }

  to {
    margin-top:0px;
    opacity: 1;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s linear;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.bg.light};
  border: 1px solid ${COLOR.divider.dark};
  padding: 35px;
  margin: 10px 0px 10px 0px;
  width: 100%;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 15px;
  }
`

export const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  color: ${COLOR.primary.shade1};
  width: 100%;
`
export const Line = styled.div`
  flex: 2;
  height: 1px;
  background: ${COLOR.divider.dark};
`

export const CenteredRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 25px 0px 25px 0px;
`

export const DividerText = styled.div`
  color: ${COLOR.divider.dark};
  margin: 0px 15px 0px 15px;
`
export const LinkText = styled.div`
  cursor: pointer;
  font-weight: 600;
  color: ${COLOR.primary.main};
  &:hover {
    color: ${COLOR.primary.shade2};
  }
`
export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
