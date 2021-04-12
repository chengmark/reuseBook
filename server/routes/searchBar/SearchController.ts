import { Request, Response } from 'express'
import Book from '../../models/Book'
import Category from '../../models/Category'
import spelling from 'spelling'
import dictionary from 'spelling/dictionaries/en_US'

type Search = {
  keyword: string
  pageNum: number
  pageSize: number
  persist: boolean
}

const SearchController = {
  search: async (req: Request, res: Response): Promise<unknown> => {
    const { keyword, pageNum, pageSize, persist } = <Search>(<unknown>req.body)
    let suggestion = ''
    if (!keyword) return res.status(400).send({ message: 'Enter something' })
    if (!persist) {
      suggestion = getSuggestion(keyword) // suggestion or empty string
    }
    const category = await Category.findOne({ name: suggestion || keyword }) // find the catrgory string
    if (category) {
      // keyword is a category
      return res
        .status(200)
        .send({ books: await findBookByCategory(category._id, pageNum, pageSize), suggestion: suggestion })
    } else {
      // keyword is not a category
      return res
        .status(200)
        .send({ books: await findBookByName(suggestion || keyword, pageNum, pageSize), suggestion: suggestion })
    }
  },
}

const getSuggestion = (keyword: string): string => {
  const dict = new spelling(dictionary)
  let suggestion = ''
  let suggested = false
  const tmp: Array<string> = []
  keyword.split(' ').forEach((word) => {
    const lookup = dict.lookup(word)
    if (!lookup.found) {
      if (lookup.suggestions.length > 0) {
        tmp.push(lookup.suggestions[0].word)
        suggested = true
      } else tmp.push(word)
    } else tmp.push(word)
  })
  if (suggested) suggestion = tmp.join(' ')
  return suggestion
}

const findBookByCategory = async (categoryId: string, pageNum: number, pageSize: number) => {
  const result = await Book.find({ category: categoryId })
    .populate('category')
    .populate('sellerId')
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .exec()
  return result
}

const findBookByName = async (keyword: string, pageNum: number, pageSize: number) => {
  const bookList = await Book.find().populate('category').populate('sellerId').exec()
  const wordsOfKeyword = keyword.split(' ')
  const result: Array<any> = []
  bookList.forEach((book) => {
    let cnt = 0
    const wordsOfBookName = book['name'].toLowerCase().split(' ')
    const usedHash = new Array(wordsOfBookName.length).fill(false) // whether the word of book name is used for calculating similarity
    for (let i = 0; i < wordsOfKeyword.length; i++) {
      for (let j = 0; j < wordsOfBookName.length; j++) {
        if (usedHash[j]) continue
        if (jaroWinkler(wordsOfKeyword[i], wordsOfBookName[j]) > 0.7) {
          usedHash[j] = true
          cnt++
          break
        }
      }
    }
    if (cnt > wordsOfKeyword.length / 3) result.push(book)
  })
  const start = (pageNum - 1) * pageSize
  const end = start + pageSize - 1
  return result.slice(start, end)
}

export default SearchController

const jaroWinkler = (s1: string, s2: string): number => {
  if (s1.length === 0 || s2.length === 0) return 0 // base case

  // non case sensitive
  s1 = s1.toLowerCase()
  s2 = s2.toLowerCase()

  if (s1 === s2) return 1 // match exactly

  // Number of matches
  let matches = 0

  const maxDist = Math.floor(Math.max(s1.length, s2.length) / 2) - 1

  // Hash of matches for transpoitions calculation
  const s1Hash = new Array(s1.length)
  const s2Hash = new Array(s2.length)

  for (let i = 0; i < s1.length; i++) {
    // loop over the first string
    for (let j = Math.max(0, i - maxDist); j <= Math.min(s2.length, i + maxDist + 1); j++) {
      // check for matches
      if (!s1Hash[i] && !s2Hash[j] && s1[i] === s2[j]) {
        matches++
        s1Hash[i] = s2Hash[j] = true
        break
      }
    }
  }

  if (matches === 0) return 0 // no matches

  let t = 0 // transpositions
  let point = 0

  // count transpositions
  for (let i = 0; i < s1.length; i++) {
    if (s1Hash[i]) {
      while (!s2Hash[point]) {
        point++
      }

      if (s1.charAt(i) !== s2.charAt(point++)) t++
    }
  }

  t /= 2

  let dist = (matches / s1.length + matches / s2.length + (matches - t) / matches) / 3
  let prefix = 0 // maxium 4 character prefix

  if (dist > 0.7) {
    const minIndex = Math.min(s1.length, s2.length)
    let i = 0
    while (s1[i] === s2[i] && i < 4 && i < minIndex) {
      ++prefix
      i++
    }

    dist += 0.1 * prefix * (1 - dist)
  }

  return dist
}
