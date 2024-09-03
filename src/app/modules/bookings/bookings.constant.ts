import { BookingStatus } from './bookings.interface'

export const BOOKING_STATUS: BookingStatus = {
  confirmed: 'confirmed',
  unconfirmed: 'unconfirmed',
  canceled: 'canceled',
} as const
