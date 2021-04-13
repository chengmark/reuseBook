import { checkIntegrity, formNoErr, VALIDATORS, Target } from '@src/formIntegrity'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { FormContainer, TextInput, BtnRow, Title, PriceType, Btn } from '../style'
import { Autocomplete } from '@material-ui/lab'
import CategoryService from '@src/services/CategoryService'
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
    author: { value: '', errMsg: '' },
    type: { value: 'sell', errMsg: '' },
    price: { value: '', errMsg: '' },
    tradeOption: { value: '', errMsg: '' },
    condition: { value: 'used', errMsg: '' },
    description: { value: '', errMsg: '' },
  })
  const [categories, setCategories] = useState<Category[]>([
    {
      _id: '',
      name: '',
    },
  ])

  useEffect(() => {
    CategoryService.listCategories()
      .then((res: Category[]) => {
        setCategories(res)
      })
      .catch((err) => {
        if (err.response) enqueueSnackbar(err.response.data.message, { variant: 'error' })
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
      type: { value: type, errMsg: '' },
      price: { value: '', errMsg: '' },
      tradeOption: { value: '', errMsg: '' },
    })
  }

  const handleConditionClick = (condition: string) => {
    setInput({
      ...input,
      condition: { value: condition, errMsg: '' },
    })
  }

  const handleSubmit = () => {
    const category = checkIntegrity(input.category, [VALIDATORS.REQUIRED])
    const title = checkIntegrity(input.title, [VALIDATORS.REQUIRED])
    const author = checkIntegrity(input.author, [VALIDATORS.REQUIRED])
    if (input.type.value == 'sell') {
      const price = checkIntegrity(input.price, [VALIDATORS.REQUIRED, VALIDATORS.NUM_ONLY])
      setInput({ ...input, category, title, author, price })
    } else {
      const tradeOption = checkIntegrity(input.tradeOption, [VALIDATORS.REQUIRED])
      setInput({ ...input, category, title, author, tradeOption })
    }
    if (formNoErr(input)) {
      const details: Details = {
        category: categories.find((category) => category._id == input.category.value) as Category,
        title: input.title.value,
        type: input.type.value,
        price: input.price.value,
        tradeOption: input.tradeOption.value,
        description: input.description.value,
        author: input.author.value,
        condition: input.condition.value,
      }
      goStep3(details)
    }
  }

  return (
    <FormContainer direction="column">
      <Autocomplete
        onChange={(event: unknown, newValue: Category | null) => {
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
        label="Book Name"
        type="text"
        autoComplete="current-title"
        variant="outlined"
        error={!!input.title.errMsg}
        helperText={input.title.errMsg}
        onChange={handleInputChange}
      ></TextInput>
      <TextInput
        id="author-input"
        name="author"
        label="Author"
        type="text"
        autoComplete="current-author"
        variant="outlined"
        error={!!input.author.errMsg}
        helperText={input.author.errMsg}
        onChange={handleInputChange}
      ></TextInput>
      <Title>Condition</Title>
      <BtnRow>
        <PriceType
          key="used"
          label="Used"
          active={+(input.condition.value == 'used')}
          onClick={() => {
            handleConditionClick('used')
          }}
        />
        <PriceType
          key="new"
          label="New"
          active={+(input.condition.value == 'new')}
          onClick={() => {
            handleConditionClick('new')
          }}
        />
      </BtnRow>
      <Title>Type</Title>
      <BtnRow>
        <PriceType
          key="sell"
          label="Sell"
          active={+(input.type.value == 'sell')}
          onClick={() => {
            handlePriceTypeClick('sell')
          }}
        />
        <PriceType
          key="trade"
          label="Trade"
          active={+(input.type.value == 'trade')}
          onClick={() => {
            handlePriceTypeClick('trade')
          }}
        />
      </BtnRow>
      {input.type.value == 'sell' && (
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
      {input.type.value == 'trade' && (
        <TextInput
          id="trade-option-input"
          name="tradeOption"
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
