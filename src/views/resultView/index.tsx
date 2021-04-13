import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Slider,
  TextField,
} from '@material-ui/core'
import ProductTile from '@src/components/productTile'
import SearchBar from '@src/components/searchBar'
import BookService from '@src/services/BookService'
import { getUrlLastSegmant } from '@src/utils'
import React, { FocusEvent, ChangeEvent, ReactElement, useEffect, useState } from 'react'
import {
  Separator,
  OperationWrapper,
  ProductWrapper,
  ResultWrapper,
  Wrapper,
  FlexRow,
  PriceInput,
  PriceBtn,
  FilterTitle,
  PreResultRow,
  SuggestionText,
  SuggestionLink,
  SuggestionWrapper,
  SortSelect,
  SortControl,
} from './style'
import CategoryService from '../../services/CategoryService'
import { Category } from '@myTypes/Category'
import { Autocomplete } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { LOCATIONS, toPath } from '@src/routes'

const ResultView = (): ReactElement => {
  const [books, setBooks] = useState<Array<any>>([])
  const [suggestion, setSuggestion] = useState('')
  const MAX_PRICE = 500
  const [filter, setFilter] = useState({
    listingType: '', // sell or trade or ''
    category: '', // category id
    condition: '', // new or used
    price: [0, 500],
  })
  const [sort, setSort] = useState('createdAt')
  const [categories, setCategories] = useState<Array<Category>>([])
  const history = useHistory()

  useEffect(() => {
    searchBooks()
    CategoryService.listCategories()
      .then((res) => {
        setCategories(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const searchBooks = (persist = false) => {
    BookService.search(getUrlLastSegmant(), persist)
      .then((res) => {
        setBooks(res.books as Array<any>)
        setSuggestion(res.suggestion as string)
        // if (res.suggestion) history.push(toPath(LOCATIONS.search, res.suggestion as string))
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const filterBook = () => {}

  const handleTypeOnClick = (type: string) => {
    if (filter.listingType == type) setFilter({ ...filter, listingType: '' })
    else setFilter({ ...filter, listingType: type })
  }

  const handleConditionOnClick = (condition: string) => {
    if (filter.condition == condition) setFilter({ ...filter, condition: '' })
    else setFilter({ ...filter, condition: condition })
  }

  const handlePriceChange = (eveny: any, newValue: number | number[]) => {
    setFilter({ ...filter, price: newValue as number[] })
  }

  const handleMinPriceOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    if (!isNaN(value)) {
      setFilter({ ...filter, price: [value > filter.price[1] ? filter.price[1] : value, filter.price[1]] })
    }
  }

  const handleMaxPriceOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      if (value > MAX_PRICE) {
        setFilter({ ...filter, price: [filter.price[0], MAX_PRICE] })
      } else {
        setFilter({ ...filter, price: [filter.price[0], value] })
      }
    }
  }

  const handleMinPriceOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setFilter({ ...filter, price: [value < 0 ? 0 : value, filter.price[1]] })
  }

  const handleMaxPriceOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setFilter({ ...filter, price: [filter.price[0], value < filter.price[0] ? filter.price[0] : value] })
  }

  const handleSortChange = (e: ChangeEvent<{ value: unknown }>) => {
    setSort(e.target.value as string)
  }

  const handlePersistOnClick = () => {
    searchBooks(true)
  }

  const handleCategoryChange = (event: unknown, newValue: Category | null) => {
    setFilter({ ...filter, category: newValue?._id as string })
  }

  return (
    <Wrapper>
      <SearchBar callback={searchBooks} />
      <PreResultRow>
        {suggestion ? (
          <SuggestionWrapper>
            <SuggestionText>
              {`Showing results for `}
              <SuggestionLink>{suggestion}</SuggestionLink>
            </SuggestionText>
            <SuggestionText persist>
              {`Search instead for `}
              <SuggestionLink persist onClick={handlePersistOnClick}>
                {getUrlLastSegmant()}
              </SuggestionLink>
            </SuggestionText>
          </SuggestionWrapper>
        ) : (
          <SuggestionWrapper>
            <SuggestionText>
              {`Showing results for `}
              <SuggestionLink>{getUrlLastSegmant()}</SuggestionLink>
            </SuggestionText>
          </SuggestionWrapper>
        )}
        <SortControl variant="outlined">
          <InputLabel id="sort-label">Sort</InputLabel>
          <SortSelect labelId="sort-label" id="sort-select" value={sort} onChange={handleSortChange} label="Sort">
            <MenuItem value={`createdAt`}>Latest</MenuItem>
            <MenuItem value={`reviewNum`}>Review No.</MenuItem>
          </SortSelect>
        </SortControl>
      </PreResultRow>
      <ResultWrapper>
        <OperationWrapper>
          <FilterTitle>Filter</FilterTitle>
          <Autocomplete
            onChange={handleCategoryChange}
            id="categories"
            getOptionLabel={(option) => option.name}
            options={categories}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
          />
          <Separator />
          <FormLabel>Listing Type</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.listingType == 'sell'}
                  onClick={() => {
                    handleTypeOnClick('sell')
                  }}
                  name="For sell"
                />
              }
              label="For sell"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.listingType == 'trade'}
                  onClick={() => {
                    handleTypeOnClick('trade')
                  }}
                  name="For trade"
                />
              }
              label="For trade"
            />
            {filter.listingType == 'sell' && (
              <>
                <FormLabel>Price</FormLabel>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={filter.price}
                  onChange={handlePriceChange}
                  aria-labelledby="range-slider"
                />
                <FlexRow>
                  <PriceInput
                    onChange={handleMinPriceOnChange}
                    variant="outlined"
                    label="min price"
                    value={filter.price[0]}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onBlur={handleMinPriceOnBlur}
                  />
                  <PriceInput
                    onChange={handleMaxPriceOnChange}
                    variant="outlined"
                    label="max price"
                    value={filter.price[1] == MAX_PRICE ? `${MAX_PRICE}+` : filter.price[1]}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onBlur={handleMaxPriceOnBlur}
                  />
                  <PriceBtn>Find</PriceBtn>
                </FlexRow>
              </>
            )}
          </FormGroup>
          <Separator />
          <FormLabel>Condition</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.condition == 'new'}
                  onClick={() => {
                    handleConditionOnClick('new')
                  }}
                  name="new"
                />
              }
              label="New"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.condition == 'used'}
                  onClick={() => {
                    handleConditionOnClick('used')
                  }}
                  name="used"
                />
              }
              label="Used"
            />
          </FormGroup>
        </OperationWrapper>
        <ProductWrapper>
          {books.map((book) => (
            <ProductTile book={book} key={book._id} />
          ))}
        </ProductWrapper>
      </ResultWrapper>
    </Wrapper>
  )
}

export default ResultView
