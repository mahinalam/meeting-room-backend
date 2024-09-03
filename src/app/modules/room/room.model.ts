import { Schema, model } from 'mongoose'
import { IRoom, RoomModel } from './room.interface'
const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    roomNo: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    floorNo: {
      type: Number,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      trim: true,
    },
    pricePerSlot: {
      type: Number,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    amenities: {
      type: [String],
      required: true,
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
