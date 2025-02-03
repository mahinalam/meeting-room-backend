import { Schema, model } from 'mongoose'
import { IRoom, RoomModel } from './room.interface'
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
    adult: {
      type: Number,
      required: true,
      trim: true,
    },
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
    child: {
      type: Number,
      default: 0,
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
