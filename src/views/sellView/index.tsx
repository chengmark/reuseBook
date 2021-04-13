import { Step, StepLabel, Stepper } from '@material-ui/core'
import { CenteredLayout } from '@src/layout'
import React, { ReactElement, useState } from 'react'
import DetailsForm from './detailsForm'
import { Container, StepContentWrapper, Title } from './style'
import UploadForm from './uploadForm'
import { Details, Image } from '@myTypes/Product'
import ConfirmForm from './confirmForm'
import BookService from '@src/services/BookService'
import { Obj } from '@myTypes/Obj'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'
import { uuidv4 } from '@src/utils'

type loadType = {
  goStep2: (image: { dataURL: string; file: File }) => void
  goStep3: (details: Details) => void
  goStep1: () => void
  submitForm: () => void
  image: Image
  details: Details
}

const getSteps = () => {
  return ['Upload photos', 'Fill in details', 'Confirm']
}

const getStepContent = (index: number, load: loadType) => {
  switch (index) {
    case 0:
      return <UploadForm goStep2={load.goStep2} />
    case 1:
      return <DetailsForm goStep3={load.goStep3} />
    case 2:
      return (
        <ConfirmForm goStep1={load.goStep1} submitForm={load.submitForm} image={load.image} details={load.details} />
      )
    default:
      return 'undefined step'
  }
}

const SellView = (): ReactElement => {
  const [activeStep, setActiveStep] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const [image, setImage] = useState<Image>({ dataURL: '', file: new File([''], '') })
  const [details, setDetails] = useState<Details>({
    category: { _id: '', name: '' },
    title: '',
    author: '',
    type: '',
    price: '',
    tradeOption: '',
    description: '',
    condition: '',
  })
  const steps = getSteps()

  const goStep2 = (image: { dataURL: string; file: File }): void => {
    setImage(image)
    setActiveStep(1)
  }

  const goStep3 = (details: Details): void => {
    setDetails(details)
    setActiveStep(2)
  }

  const goStep1 = (): void => {
    setActiveStep(0)
  }

  const submitForm = () => {
    console.log(details)
    console.log(image.file)
    const imageToSend = new File([image.file], uuidv4(), { type: image.file.type })
    BookService.getSignedRequest({ fileName: imageToSend.name, fileType: imageToSend.type }) // get the aws url
      .then((res) => {
        BookService.uploadImage(imageToSend, res.signedRequest as Obj, res.url as string).then(() => {
          // upload image to aws url
          BookService.createBook({
            // create book record
            name: details.title,
            type: details.type,
            price: details.price,
            tradeOption: details.tradeOption,
            author: details.author,
            category: details.category,
            description: details.description,
            condition: details.condition,
            img: res.url,
          }).then((res) => {
            console.log(res)
            history.push(toPath(LOCATIONS.product, res._id as string)) // should redirect to the book post
            enqueueSnackbar('Book listed.', { variant: 'success' })
          })
        })
      })
      .catch(() => {
        enqueueSnackbar('Please try again later.', { variant: 'error' })
      })
  }

  return (
    <CenteredLayout>
      <Container>
        <Title center>List a book</Title>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <StepContentWrapper>
          {getStepContent(activeStep, { goStep2, goStep3, goStep1, submitForm, image, details })}
        </StepContentWrapper>
      </Container>
    </CenteredLayout>
  )
}

export default SellView
