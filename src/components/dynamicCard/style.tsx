import { MEDIA_BREAK, MAX_APP_COLUMN_WIDTH } from '@src/layout'
import { COLOR } from '@src/styling'
import styled from 'styled-components'

type Props = {
  width?: number
  height?: number
  bgColor?: string
}

export const CardWrapper = styled.div`
  ${(props: Props) => `
  display: flex;
  flex-direction: column;
  width: ${props.width ? props.width + 'px' : 'fit-content'};
  height: ${props.height ? props.height + 'px' : 'fit-content'};
  background: ${props.bgColor ? props.bgColor : COLOR.bg.light};
  border-radius: 4px;
  border: 1px solid ${COLOR.divider.dark};
  padding: 35px;
  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 15px;
  }
`}
`
