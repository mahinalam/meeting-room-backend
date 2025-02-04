/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { TGuest } from '../bookings/bookings.interface'

export interface IRoom {
  _id: string
  host: string | Types.ObjectId
  title: string
  location: string
  bedRoom: number
  bathRoom: number
  images: string[]
  guests: TGuest
  from: Date
  to: Date
  isDeleted: boolean
}

export interface RoomModel extends Model<IRoom> {
  isRoomExists(id: string): Promise<IRoom>
  isRoomsDeleted(): Promise<IRoom | null>
}
