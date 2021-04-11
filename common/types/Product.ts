import { Category } from './Category'

export type Image = {
  dataURL: string
  file: File
}

export type Details = {
  category: Category
  title: string
  author: string
  type: string
  price: string
  tradeOption: string
  description: string
  condition: string
}
