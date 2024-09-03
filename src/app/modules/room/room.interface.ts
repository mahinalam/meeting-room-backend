/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IRoom {
  name: string
  roomNo: number
  floorNo: number
  capacity: number
  pricePerSlot: number
  image: string
  amenities: string[]
  isDeleted: boolean
}

export interface RoomModel extends Model<IRoom> {
  isRoomExists(id: string): Promise<IRoom>
  isRoomsDeleted(): Promise<IRoom | null>
}
