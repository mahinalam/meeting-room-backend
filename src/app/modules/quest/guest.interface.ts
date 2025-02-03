import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  lastName: string
}

export type TGuest = {
  user: Types.ObjectId
  name: TUserName
  email: string
  contactNo: string
  address: string
  profileImg?: string
  isDeleted: boolean
}

//for creating static
export interface GuestModel extends Model<TGuest> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(email: string): Promise<TGuest | null>
}
