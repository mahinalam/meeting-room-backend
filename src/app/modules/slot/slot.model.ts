import { Schema, model } from 'mongoose'
import { ISlot } from './slot.interface'

const slotSchema = new Schema<ISlot>(
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
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  { timestamps: true },
)

slotSchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})
slotSchema.pre('find', function (next) {
  this.where({ isBooked: false })
  next()
})

export const Slot = model<ISlot>('Slot', slotSchema)
