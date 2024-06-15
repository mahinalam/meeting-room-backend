import { z } from 'zod'
import { BOOKING_STATUS } from './bookings.constant'
const createBookingsValidationSchema = z.object({
  body: z.object({
    date: z.string().trim(),
    slots: z.array(z.string()),
    room: z.string().trim(),
    user: z.string().trim(),
    totalAmount: z.number().optional(),
  }),
})
const updateBookingsValidationSchema = z.object({
  body: z.object({
    isConfirmed: z.enum([BOOKING_STATUS.confirmed, BOOKING_STATUS.unconfirmed, BOOKING_STATUS.canceled]),
  }),
})

export const BookingsValidationSchema = {
  createBookingsValidationSchema,
  updateBookingsValidationSchema
}
