import { z } from 'zod'
import { BOOKING_STATUS } from './bookings.constant'

const createBookingsValidationSchema = z.object({
  body: z.object({
    room: z.string().min(1, 'Room ID is required'),
    checkInDate: z
      .string()
      .datetime({ message: 'Invalid check-in date format' }),
    checkOutDate: z
      .string()
      .datetime({ message: 'Invalid check-out date format' }),
    guests: z.object({
      adult: z.number().min(1, 'At least one adult is required'),
      child: z.number().min(0, 'Child count cannot be negative').optional(),
    }),
    totalAmount: z.number().min(0, 'Total amount must be positive'),
    paymentMethod: z.enum(['cash', 'amarPay'], {
      errorMap: () => ({ message: 'Invalid payment method' }),
    }),
    paymentStatus: z.enum(['pending', 'paid', 'failed'], {
      errorMap: () => ({ message: 'Invalid payment status' }),
    }),
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed'], {
      errorMap: () => ({ message: 'Invalid booking status' }),
    }),
  }),
})
const updateBookingsValidationSchema = z.object({
  body: z.object({
    isConfirmed: z.enum([
      BOOKING_STATUS.confirmed,
      BOOKING_STATUS.unconfirmed,
      BOOKING_STATUS.canceled,
    ]),
  }),
})

export const BookingsValidationSchema = {
  createBookingsValidationSchema,
  updateBookingsValidationSchema,
}
