import { Schema, model } from 'mongoose'
import { AminityModel, IAminity } from './aminity.interface'

const aminitySchema = new Schema<IAminity>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,
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
// check if aminity exists
aminitySchema.statics.isAminityExists = async function (
  id: string,
): Promise<IAminity | null> {
  const isAminityExists = await Aminity.findById(id)
  return isAminityExists
}

aminitySchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})

export const Aminity = model<IAminity, AminityModel>('Aminity', aminitySchema)
