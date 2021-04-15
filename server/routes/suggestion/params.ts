import mongoose from 'mongoose'

export type ListSuggestions = {
    interestIds: Array<string>
    max: string
    exclude: string
}
