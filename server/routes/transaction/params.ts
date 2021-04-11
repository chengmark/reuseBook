import mongoose from 'mongoose'

export type RecordTransaction = {
    buyer: string
    seller: string
    bookname: string
    bookauthor: string
    bookprice: string
    category: string
    description: string
}

export type ListTransactions = {
    status?: string
}

export type ListBuying = {
    userId: string
}

export type ListSelling = {
    userId: string
}
