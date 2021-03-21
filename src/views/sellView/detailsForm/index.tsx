import { MenuItem } from '@material-ui/core'
import { checkIntegrity, VALIDATORS } from '@src/formIntegrity'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { FormContainer, TextInput, BtnRow, Title, PriceType, CategoryInput, Btn } from '../style'

type Props = {
  goStep3: (details: any) => void
}

type CategoryType = {
  title: string
}
const testCategories = [{ title: 'Math' }, { title: 'Art' }, { title: 'Bio' }, { title: 'CS' }, { title: 'Eng' }]

const DetailsForm = (props: Props): ReactElement => {
  const { goStep3, ...rest } = props
  const [input, setInput] = useState({
    category: { value: '', errMsg: '' },
    title: { value: '', errMsg: '' },
    listType: { value: 'sell', errMsg: '' },
    price: { value: '', errMsg: '' },
    tradeOption: { value: '', errMsg: '' },
    condition: { value: '', errMsg: '' },
    description: { value: '', errMsg: '' },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handlePriceTypeClick = (type: string) => {
    setInput({ ...input, listType: { value: type, errMsg: '' } })
  }

  const handleSubmit = () => {
    const category = checkIntegrity(input.category, [VALIDATORS.REQUIRED])
    const title = checkIntegrity(input.title, [VALIDATORS.REQUIRED])
    setInput({ ...input, category, title })
    if (!(category.errMsg || title.errMsg)) goStep3(input)
  }

  return (
    <FormContainer>
      <TextInput
        id="title-input"
        name="title"
        label="Listing Title"
        type="text"
        autoComplete="current-title"
        variant="outlined"
        error={!!input.title.errMsg}
        helperText={input.title.errMsg}
        onChange={handleInputChange}
      ></TextInput>
      <Title>Type</Title>
      <BtnRow>
        <PriceType
          key="sell"
          label="Sell"
          active={+(input.listType.value == 'sell')}
          onClick={() => {
            handlePriceTypeClick('sell')
          }}
        />
        <PriceType
          key="trade"
          label="Trade"
          active={+(input.listType.value == 'trade')}
          onClick={() => {
            handlePriceTypeClick('trade')
          }}
        />
      </BtnRow>
      {input.listType.value == 'sell' && (
        <TextInput
          id="price-input"
          name="price"
          label="Price in HKD"
          type="number"
          autoComplete="current-price"
          variant="outlined"
          InputProps={{ inputProps: { min: 0, max: 100000 } }}
          error={!!input.price.errMsg}
          helperText={input.price.errMsg}
          onChange={handleInputChange}
        ></TextInput>
      )}
      {input.listType.value == 'trade' && (
        <TextInput
          id="trade-option-input"
          name="trade-option"
          label="What kind of book do you want to trade?"
          type="text"
          autoComplete="current-trade-option"
          variant="outlined"
          error={!!input.tradeOption.errMsg}
          helperText={input.tradeOption.errMsg}
          onChange={handleInputChange}
        ></TextInput>
      )}
      <Btn onClick={handleSubmit}>next step</Btn>
    </FormContainer>
  )
}

export default DetailsForm
