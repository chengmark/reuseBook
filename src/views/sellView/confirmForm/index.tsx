import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Details, Image } from '@myTypes/Product'
import RepeatIcon from '@material-ui/icons/Repeat'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import TitleIcon from '@material-ui/icons/Title'
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined'
import React, { ReactElement } from 'react'
import { Btn, BtnRow, CoverPhoto, CoverPhotoWrapper, DetailsWrapper, FormContainer, Progress } from '../style'
import { capFirst } from '@src/utils'

type Props = {
  goStep1: () => void
  submitForm: () => void
  image: Image
  details: Details
  loading: boolean
}

const ConfirmForm = (props: Props): ReactElement => {
  const { goStep1, submitForm, image, details, loading } = props

  return (
    <FormContainer center direction="row">
      <CoverPhotoWrapper width="60%">
        Cover Photo
        <CoverPhoto>
          <img src={image.dataURL} width="100%" />
        </CoverPhoto>
      </CoverPhotoWrapper>
      <DetailsWrapper width="40%">
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={details.category.name} secondary="Category" style={{ wordBreak: 'break-word' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TitleIcon />
            </ListItemIcon>
            <ListItemText primary={details.title} secondary="Book Name" style={{ wordBreak: 'break-word' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary={details.author} secondary="Author" style={{ wordBreak: 'break-word' }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LabelOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={capFirst(details.condition)}
              secondary="Condition"
              style={{ wordBreak: 'break-word' }}
            />
          </ListItem>
          {details.type == 'sell' ? (
            <ListItem>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={`$ ${details.price}`} secondary="Price" style={{ wordBreak: 'break-word' }} />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemIcon>
                <RepeatIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${details.tradeOption}`}
                secondary="Trade Option"
                style={{ wordBreak: 'break-word' }}
              />
            </ListItem>
          )}
          <ListItem>
            <ListItemIcon>
              <DescriptionOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${details.description}`}
              secondary="Description"
              style={{ wordBreak: 'break-word' }}
            />
          </ListItem>
        </List>
        <BtnRow>
          <Btn onClick={goStep1} secondary>
            discard
          </Btn>
          <div>
            <Btn onClick={submitForm} disabled={loading}>
              Confirm
            </Btn>
            {loading && <Progress size={24} />}
          </div>
        </BtnRow>
      </DetailsWrapper>
    </FormContainer>
  )
}

export default ConfirmForm
