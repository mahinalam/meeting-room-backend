import { Schema, model } from 'mongoose'
import { IBookings } from './bookings.interface'

const bookingsSchema = new Schema<IBookings>(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Room',
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    slots: {
      type: [String],
      required: true,
      trim: true,
      ref: 'Slot'
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User'
    },
    totalAmount: {
      type: Number,
      required: true,
      trim: true,
    },
    isConfirmed: {
        type: String,
        enum: ['confirmed', 'unconfirmed', 'canceled'],
      trim: true,
      default: 'unconfirmed'
    },
    isDeleted: {
      type: Boolean,
      trim: true,
      default: false,
    }
  },
  { timestamps: true },
)

// bookingsSchema.pre('save', async function(){

// })

export const Booking = model<IBookings>('Booking', bookingsSchema)
