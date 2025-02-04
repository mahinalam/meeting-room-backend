import { Types } from 'mongoose'

export type BookingStatus = {
  confirmed: 'confirmed'
  unconfirmed: 'unconfirmed'
  canceled: 'canceled'
}

export type TGuest = {
  adult: number
  child: number
  totalCapacity?: number
}

export interface IBooking {
  user: Types.ObjectId | string
  room: Types.ObjectId
  checkInDate: string | Date
  checkOutDate: string | Date
  guests: TGuest
  totalAmount: number
  paymentMethod: 'cash' | 'amarPay'
  paymentStatus: 'pending' | 'paid' | 'failed'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt?: Date
  updatedAt?: Date
  isDeleted: boolean
}
