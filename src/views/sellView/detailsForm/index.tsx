import { checkIntegrity, formNoErr, VALIDATORS, Target } from '@src/formIntegrity'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { FormContainer, TextInput, BtnRow, Title, PriceType, Btn } from '../style'
import { Autocomplete } from '@material-ui/lab'
import CategoryHelper from '@src/helpers/CategoryHelper'
import { useSnackbar } from 'notistack'
import { Category } from '@myTypes/Category'
import { Details } from '@myTypes/Product'

type Props = {
  goStep3: (details: Details) => void
}

// const testCategories = [{ title: 'Math' }, { title: 'Art' }, { title: 'Bio' }, { title: 'CS' }, { title: 'Eng' }]

const DetailsForm = (props: Props): ReactElement => {
  const { goStep3 } = props
  const { enqueueSnackbar } = useSnackbar()
  const [input, setInput] = useState<Record<string, Target>>({
    category: { value: '', errMsg: '' },
    title: { value: '', errMsg: '' },
    listType: { value: 'sell', errMsg: '' },
    price: { value: '', errMsg: '' },
    tradeOption: { value: '', errMsg: '' },
    condition: { value: '', errMsg: '' },
    description: { value: '', errMsg: '' },
  })
  const [categories, setCategories] = useState<Category[]>([
    {
      _id: '',
      name: '',
    },
  ])

  useEffect(() => {
    CategoryHelper.listCategories()
      .then((res: Category[]) => {
        setCategories(res)
      })
      .catch((err) => {
        console.log(err.response)
        enqueueSnackbar(err.response.data.message, { variant: 'error' })
      })
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handlePriceTypeClick = (type: string) => {
    setInput({
      ...input,
      listType: { value: type, errMsg: '' },
      price: { value: '', errMsg: '' },
      tradeOption: { value: '', errMsg: '' },
    })
  }

  const handleSubmit = () => {
    const category = checkIntegrity(input.category, [VALIDATORS.REQUIRED])
    const title = checkIntegrity(input.title, [VALIDATORS.REQUIRED])
    if (input.listType.value == 'sell') {
      const price = checkIntegrity(input.price, [VALIDATORS.REQUIRED, VALIDATORS.NUM_ONLY])
      setInput({ ...input, category, title, price })
    } else {
      const tradeOption = checkIntegrity(input.tradeOption, [VALIDATORS.REQUIRED])
      setInput({ ...input, category, tradeOption })
    }
    if (formNoErr(input)) {
      const details: Details = {
        category: categories.find((category) => category._id == input.category.value) as Category,
        title: input.title.value,
        listType: input.listType.value,
        price: input.price.value,
        tradeOption: input.tradeOption.value,
        description: input.description.value,
      }
      goStep3(details)
    }
  }

  return (
    <FormContainer direction="column">
      <Autocomplete
        onChange={(event: any, newValue: Category | null) => {
          setInput({ ...input, category: { value: newValue?._id ?? '', errMsg: '' } })
        }}
        // inputValue={input.category.value.name}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue)
        // }}
        id="categories"
        getOptionLabel={(option) => option.name}
        options={categories}
        renderInput={(params) => (
          <TextInput
            {...params}
            label="Category"
            variant="outlined"
            error={!!input.category.errMsg}
            helperText={input.category.errMsg}
          />
        )}
      />
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
      <TextInput
        id="description-input"
        name="description"
        label="Description (optional)"
        type="text"
        autoComplete="current-description"
        variant="outlined"
        error={!!input.description.errMsg}
        helperText={input.description.errMsg}
        onChange={handleInputChange}
        multiline
      ></TextInput>
      <Btn onClick={handleSubmit}>next step</Btn>
    </FormContainer>
  )
}

export default DetailsForm
