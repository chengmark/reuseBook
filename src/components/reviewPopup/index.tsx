import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import { checkIntegrity, formNoErr, VALIDATORS } from '@src/formIntegrity'
import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { Container, Input } from './style'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<any>>
  children?: ReactElement
}

const ReviewPopup = (props: Props): ReactElement => {
  const { open, setOpen, ...rest } = props
  const [input, setInput] = useState({
    content: { value: '', errMsg: '' },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleDialogOpen = () => {
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleUpdateInfo = () => {
    const content = checkIntegrity(input.content, [VALIDATORS.REQUIRED, VALIDATORS.LENGTH_EIGHT])
    setInput({ ...input, content })
    if (formNoErr(input)) {
    }
  }

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>{'Add Review'}</DialogTitle>
      <DialogContent dividers>
        <DialogContent>
          <Container>
            <Input
              id="content-input"
              name="content"
              label="Content"
              type="content"
              autoComplete="current-content"
              variant="outlined"
              error={!!input.content.errMsg}
              helperText={input.content.errMsg}
              onChange={handleInputChange}
              multiline
              rows={1}
              rowsMax={10}
            />
          </Container>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleUpdateInfo} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReviewPopup
