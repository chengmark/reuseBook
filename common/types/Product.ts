import { Category } from './Category'

export type Image = {
  dataURL: string
  file: File
}

export type Details = {
  category: Category
  title: string
  listType: string
  price: string
  tradeOption: string
  description: string
}
