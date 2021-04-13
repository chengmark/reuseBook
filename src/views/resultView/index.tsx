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
import { Obj } from '@myTypes/Obj'
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
  SelectInput,
  SelectControl,
  NoBookFoundText,
  MobileSelect,
} from './style'
import CategoryService from '../../services/CategoryService'
import { Category } from '@myTypes/Category'
import { Autocomplete } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { LOCATIONS, toPath } from '@src/routes'
import LoadingSkeleton from './loadingSkeleton'

const skeletonIterator = new Array(10).fill(0)

type Filter = {
  listingType: string
  category: string
  condition: string
  price: number[]
}

const ResultView = (): ReactElement => {
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState<Array<any>>([])
  const [suggestion, setSuggestion] = useState('')
  const MAX_PRICE = 500
  const [filter, setFilter] = useState<Filter>({
    listingType: '', // sell or trade or ''
    category: '', // category id
    condition: '', // new or used
    price: [0, 500],
  })
  const [sort, setSort] = useState<'similarity' | 'createdAt' | 'reviewNum'>('similarity')
  const [categories, setCategories] = useState<Array<Category>>([])
  const [openFilterPanel, setOpenFilterPanel] = useState({
    category: false,
    listingType: false,
    condition: false,
  })

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

  const searchBooks = (
    persist = false,
    sort: 'similarity' | 'createdAt' | 'reviewNum' = 'similarity',
    filter: Obj = {},
  ) => {
    setLoading(true)
    BookService.search(getUrlLastSegmant(), persist, sort, filter)
      .then((res) => {
        setBooks(res.books as Array<any>)
        setSuggestion(res.suggestion as string)
        setLoading(false)
        // if (res.suggestion) history.push(toPath(LOCATIONS.search, res.suggestion as string))
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleTypeOnClick = (type: string) => {
    const newFilter = filter
    if (filter.listingType == type) newFilter.listingType = ''
    else newFilter.listingType = type
    setFilter(newFilter)
    searchBooks(false, sort, formatFilter(newFilter))
    console.log(formatFilter(newFilter))
  }

  const handleConditionOnClick = (condition: string) => {
    const newFilter = filter
    if (filter.condition == condition) newFilter.condition = ''
    else newFilter.condition = condition
    setFilter(newFilter)
    searchBooks(false, sort, formatFilter(newFilter))
    console.log(formatFilter(newFilter))
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
    setSort(e.target.value as 'similarity' | 'createdAt' | 'reviewNum')
    searchBooks(true, e.target.value as 'similarity' | 'createdAt' | 'reviewNum', formatFilter(filter))
  }

  const handlePersistOnClick = () => {
    searchBooks(true, sort, formatFilter(filter))
  }

  const handleCategoryChange = (event: unknown, newValue: Category | null) => {
    const newFilter = filter
    newFilter.category = newValue?._id as string
    setFilter(newFilter)
    searchBooks(false, sort, formatFilter(newFilter))
  }

  const handlePriceFindOnClick = () => {
    searchBooks(false, sort, formatFilter(filter))
  }

  const formatFilter = (filter: Filter) => ({
    category: filter.category,
    listingType: filter.listingType,
    condition: filter.condition,
    price: {
      min: filter.price[0],
      max: filter.price[1],
    },
  })

  const toggleFilterPanel = (type: 'category' | 'listingType' | 'condition') => {
    const newState = { category: false, listingType: false, condition: false }
    newState[type] = !openFilterPanel[type]
    setOpenFilterPanel(newState)
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
        <SelectControl variant="outlined">
          <InputLabel id="sort-label">Sort</InputLabel>
          <SelectInput labelId="sort-label" id="sort-select" value={sort} onChange={handleSortChange} label="Sort">
            <MenuItem value={`similarity`}>Relevant</MenuItem>
            <MenuItem value={`createdAt`}>Latest</MenuItem>
            <MenuItem value={`reviewNum`}>Review No.</MenuItem>
          </SelectInput>
        </SelectControl>
      </PreResultRow>
      <PreResultRow isMobile>
        <MobileSelect variant="outlined">
          <SelectInput
            value={filter.category}
            onClick={() => {
              toggleFilterPanel('category')
            }}
            displayEmpty
            readOnly
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Category
            </MenuItem>
            <MenuItem value={undefined} disabled>
              Category
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category._id} disabled key={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </SelectInput>
        </MobileSelect>
        <MobileSelect variant="outlined">
          <SelectInput
            value={filter.listingType}
            onClick={() => {
              toggleFilterPanel('listingType')
            }}
            displayEmpty
            readOnly
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Listing Type
            </MenuItem>
            <MenuItem value={undefined} disabled>
              Listing Type
            </MenuItem>
            <MenuItem value="sell" disabled>
              For sell
            </MenuItem>
            <MenuItem value="trade" disabled>
              For trade
            </MenuItem>
          </SelectInput>
        </MobileSelect>
        <MobileSelect variant="outlined">
          <SelectInput
            value={filter.condition}
            onClick={() => {
              toggleFilterPanel('condition')
            }}
            displayEmpty
            readOnly
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Condition
            </MenuItem>
            <MenuItem value={undefined} disabled>
              Listing Type
            </MenuItem>
            <MenuItem value="new" disabled>
              New
            </MenuItem>
            <MenuItem value="used" disabled>
              Used
            </MenuItem>
          </SelectInput>
        </MobileSelect>
      </PreResultRow>
      {openFilterPanel.category || openFilterPanel.condition || openFilterPanel.listingType ? (
        <ResultWrapper>
          <OperationWrapper isMobile>
            {openFilterPanel.category && (
              <>
                <FilterTitle>Category</FilterTitle>
                <Autocomplete
                  onChange={handleCategoryChange}
                  id="categories"
                  getOptionLabel={(option) => option.name}
                  options={categories}
                  renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                />
              </>
            )}
            {openFilterPanel.listingType && (
              <>
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
                        <PriceBtn onClick={handlePriceFindOnClick}>Find</PriceBtn>
                      </FlexRow>
                    </>
                  )}
                </FormGroup>
              </>
            )}
            {openFilterPanel.condition && (
              <>
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
              </>
            )}
          </OperationWrapper>
        </ResultWrapper>
      ) : (
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
                    <PriceBtn onClick={handlePriceFindOnClick}>Find</PriceBtn>
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
            {loading ? (
              skeletonIterator.map(() => (
                <>
                  <LoadingSkeleton />
                  <Separator isBook />
                </>
              ))
            ) : books.length > 0 ? (
              books.map((book) => (
                <>
                  <ProductTile book={book} key={book._id} />
                  <Separator isBook />
                </>
              ))
            ) : (
              <NoBookFoundText>No Book found</NoBookFoundText>
            )}
          </ProductWrapper>
        </ResultWrapper>
      )}
    </Wrapper>
  )
}

export default ResultView
