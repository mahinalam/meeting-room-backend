/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { IRoom } from './room.interface'
import { Room } from './room.model'

const createRoomIntoDB = async (payload: IRoom) => {
  // check if the room exists
  const room = await Room.findOne({ roomNo: payload?.roomNo })
  // const room = await Room.isRoomExists(payload.name)
  if (room) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room already exists')
  }
  const result = await Room.create(payload)
  return result
}

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id)
  // if (Object.keys(result).length === 0) {
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No room exists.')
  }
  // }
  return result
}
const getAllRoomsFromDB = async () => {
  // const roomQuery = new QueryBuilder(Room.find(), query)
  //   .search(RoomSearchableFields)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields()

  const result = await Room.find()
  // const meta = await roomQuery.countTotal()
  // return {
  //   meta,
  //   result,
  // }
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'The rooms were found empty.')
  }
  return result
}

const updateRoomIntoDB = async (id: string, payload: Partial<IRoom>) => {
  // check if the room exists
  const room = await Room.isRoomExists(id)
  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found!')
  }
  const isDeletedRoom = room?.isDeleted
  if (isDeletedRoom) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room already deleted!')
  }

  const updateOperations = {}

  // Build the update operations dynamically
  for (const key in payload) {
    if (key === 'amenities' && Array.isArray(payload[key])) {
      ;(updateOperations as any).$addToSet =
        (updateOperations as any).$addToSet || {}
      ;(updateOperations as any).$addToSet[key] = { $each: payload[key] }
    } else {
      ;(updateOperations as any).$set = (updateOperations as any).$set || {}
      ;(updateOperations as any).$set[key] = (payload as any)[key]
    }
  }

  // Update the room document
  const updatedRoom = await Room.findByIdAndUpdate(id, updateOperations, {
    new: true,
  })

  return updatedRoom
}

// delete room(softDelete) from db
const deleteRoomFromDB = async (id: string) => {
  const room = await Room.isRoomExists(id)
  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found!')
  }
  const isDeletedRoom = room.isDeleted
  if (isDeletedRoom) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room already deleted!')
  }

  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomsFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
}
