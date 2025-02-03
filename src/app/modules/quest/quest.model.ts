import { Schema, model } from 'mongoose'
import { GuestModel, TGuest, TUserName } from './guest.interface'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
})

const guestSchema = new Schema<TGuest, GuestModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    contactNo: {
      type: String,
      trim: true,
    },
    profileImg: {
      type: String,
    },
    address: {
      type: String,
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

// Query Middleware
guestSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

guestSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

guestSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//creating a custom static method
guestSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Guest.findOne({ email })
  return existingUser
}

export const Guest = model<TGuest, GuestModel>('Guest', guestSchema)
