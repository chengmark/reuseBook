import { Details, Image } from '@myTypes/Product'
import React, { ReactElement } from 'react'
import {
  Btn,
  BtnRow,
  CoverPhoto,
  CoverPhotoWrapper,
  DetailsWrapper,
  DetailTitle,
  FormContainer,
  TextRow,
} from '../style'

type Props = {
  goStep1: () => void
  submitForm: () => void
  image: Image
  details: Details
}

const ConfirmForm = (props: Props): ReactElement => {
  const { goStep1, submitForm, image, details } = props

  return (
    <FormContainer center direction="column">
      <CoverPhotoWrapper width="60%">
        Cover Photo
        <CoverPhoto>
          <img src={image.dataURL} width="100%" />
        </CoverPhoto>
      </CoverPhotoWrapper>
      <DetailsWrapper width="60%">
        <TextRow>
          <DetailTitle>Category:</DetailTitle> {details.category.name}
        </TextRow>
        <TextRow>
          <DetailTitle>Title: </DetailTitle>
          {details.title}
        </TextRow>
        {details.listType == 'sell' ? (
          <>
            <TextRow>
              <DetailTitle>Type: </DetailTitle>for sell
            </TextRow>
            <TextRow>
              <DetailTitle>Price:</DetailTitle> ${details.price}
            </TextRow>
          </>
        ) : (
          <>
            <TextRow>Type: for trade</TextRow>
            <TextRow>Price: ${details.tradeOption}</TextRow>
          </>
        )}
        {details.description && (
          <TextRow>
            <DetailTitle>Description: </DetailTitle> {details.description}
          </TextRow>
        )}
      </DetailsWrapper>
      <BtnRow>
        <Btn onClick={goStep1} secondary>
          discard
        </Btn>
        <Btn onClick={submitForm}>Confirm</Btn>
      </BtnRow>
    </FormContainer>
  )
}

export default ConfirmForm
