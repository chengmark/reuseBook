import { Step, StepLabel, Stepper } from '@material-ui/core'
import { CenteredLayout } from '@src/layout'
import React, { ReactElement, useState } from 'react'
import DetailsForm from './detailsForm'
import { Container, StepContentWrapper, Title } from './style'
import UploadForm from './uploadForm'
import { Category } from '@myTypes/Category'
import { Details, Image } from '@myTypes/Product'
import ConfirmForm from './confirmForm'

type Props = {
  children?: ReactElement
}

type loadType = {
  goStep2: (image: { dataURL: string; file: File }) => void
  goStep3: (details: any) => void
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

const SellView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const [activeStep, setActiveStep] = useState(0)
  const [image, setImage] = useState<Image>({ dataURL: '', file: new File([''], '') })
  const [details, setDetails] = useState<Details>({
    category: { _id: '', name: '' },
    title: '',
    listType: '',
    price: '',
    tradeOption: '',
    description: '',
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
    console.log(image)
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
