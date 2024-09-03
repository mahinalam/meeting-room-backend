import { Types } from 'mongoose'
export type BookingStatus = {
  confirmed: 'confirmed'
  unconfirmed: 'unconfirmed'
  canceled: 'canceled'
}

export interface IBookings {
  room: Types.ObjectId
  slots: string[]
  user: Types.ObjectId
  date: string
  totalAmount: number
  isConfirmed: 'confirmed' | 'unconfirmed' | 'canceled'
  isDeleted: boolean
}
