import { Category } from '@myTypes/Category'
import { Button, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Tooltip from '@src/components/tooltip'
import CategoryHelper from '@src/services/CategoryService'
import React, { ReactElement, useState } from 'react'
import { Card, Block, InterestTitle, Divider, InterestContainer, StyledChip, PenIcon, InterestDialog } from '../style'
import { useSnackbar } from 'notistack'
import UserService from '@src/services/UserService'
import { useUserState } from '@src/context/UserContext'

interface Selectable extends Category {
  selected: boolean
}

const InterestCard = (): ReactElement => {
  const userState = useUserState()
  const user = userState.state
  const [open, setOpen] = useState(false)
  const [interests, setInterests] = useState<Selectable[]>([])
  const { enqueueSnackbar } = useSnackbar()

  const handleDialogOpen = () => {
    CategoryHelper.listCategories()
      .then((res) => {
        // set original interests to selected
        const selectables: Selectable[] = res
        ;(user.interests as Selectable[]).forEach((interest: Selectable) => {
          selectables[selectables.findIndex((selectable) => selectable.name == interest.name)].selected = true
        })
        setInterests(res as Selectable[])
      })
      .catch((err) => {
        enqueueSnackbar('Cannot get interests', { variant: 'error' })
      })
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleSelect = (index: number) => {
    const newState = interests
    newState[index].selected = !newState[index].selected
    setInterests([...newState])
  }

  const handleSubmit = () => {
    const selected = interests.filter((interest) => interest.selected)
    const selectedIds = selected.map((interest) => interest._id)
    UserService.setInterests({ userId: user._id, interestIds: selectedIds })
      .then((res) => {
        userState.updateState({ interests: selected })
        handleDialogClose()
        enqueueSnackbar('Interests updated', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Cannot update interests', { variant: 'error' })
      })
  }

  return (
    <Card>
      <Block>
        <InterestTitle>
          Interests
          <Tooltip title="Edit interests" style={{ fontSize: '14px' }}>
            <PenIcon onClick={handleDialogOpen} />
          </Tooltip>
        </InterestTitle>
        <Divider></Divider>
        <InterestContainer>
          {(user.interests as Selectable[])?.map((
            interest: Selectable, // should change any to string when user type is defined later
          ) => (
            <StyledChip key={interest._id} label={interest.name} selected />
          ))}
        </InterestContainer>
      </Block>
      <InterestDialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{'Update interests'}</DialogTitle>
        <DialogContent dividers>
          <DialogContent>
            {interests.map((interest, i) => (
              <StyledChip
                key={interest._id}
                label={interest.name}
                selected={interests[i].selected}
                onClick={() => {
                  handleSelect(i)
                }}
              />
            ))}
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </InterestDialog>
    </Card>
  )
}

export default InterestCard
