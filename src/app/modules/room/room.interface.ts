/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IRoom {
  _id: string
  title: string
  location: string
  bedRoom: number
  bathRoom: number
  adult: number
  child: number
  guestCapacity: number
  images: string[]
  isDeleted: boolean
}

export interface RoomModel extends Model<IRoom> {
  isRoomExists(id: string): Promise<IRoom>
  isRoomsDeleted(): Promise<IRoom | null>
}
