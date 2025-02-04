import { Schema, model } from 'mongoose'
import { IRoom, RoomModel } from './room.interface'
import { number } from 'zod'
import { TGuest } from '../bookings/bookings.interface'

const guestSchema = new Schema<TGuest>({
  adult: {
    type: Number,
    required: true,
  },
  child: {
    type: Number,
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
  },
})

const roomSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    guestCapacity: {
      type: Number,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
      trim: true,
    },
    guests: guestSchema,
    bathRoom: {
      type: Number,
      required: true,
      trim: true,
    },
    bedRoom: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  { timestamps: true },
)
// check if room exists
roomSchema.statics.isRoomExists = async function (
  id: string,
): Promise<IRoom | null> {
  const isRoomExists = await Room.findById(id)
  return isRoomExists
}

roomSchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})

export const Room = model<IRoom, RoomModel>('Room', roomSchema)
