import { Step, StepLabel, Stepper } from '@material-ui/core'
import { CenteredLayout } from '@src/layout'
import React, { ReactElement, useState } from 'react'
import DetailsForm from './detailsForm'
import { Container, StepContentWrapper, Title } from './style'
import UploadForm from './uploadForm'

type Props = {
  children?: ReactElement
}

const getSteps = () => {
  return ['Upload photos', 'Fill in details', 'Confirm']
}

const getStepContent = (
  index: number,
  goStep2: (image: { dataURL: string; file: File }) => void,
  goStep3: (details: any) => void,
) => {
  switch (index) {
    case 0:
      return <UploadForm goStep2={goStep2} />
    case 1:
      return <DetailsForm goStep3={goStep3} />
    case 2:
      return 'confirm view'
    default:
      return 'undefined step'
  }
}

const SellView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const [activeStep, setActiveStep] = useState(0)
  const [image, setImage] = useState({ dataURL: '', file: new File([''], '') })
  const [details, setDetails] = useState({})
  const steps = getSteps()

  const goStep2 = (image: { dataURL: string; file: File }): void => {
    setImage(image)
    setActiveStep(1)
  }

  const goStep3 = (details: any): void => {
    setDetails(details)
    setActiveStep(2)
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
        <StepContentWrapper>{getStepContent(activeStep, goStep2, goStep3)}</StepContentWrapper>
      </Container>
    </CenteredLayout>
  )
}

export default SellView
