/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { Aminity } from './aminity.model'
import { IAminity } from './aminity.interface'

const createAminityIntoDB = async (payload: IAminity) => {
  // check if the aminity exists
  const aminity = await Aminity.findOne({ title: payload?.title })
  if (aminity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Aminity already exists')
  }
  const result = await Aminity.create(payload)
  return result
}

const getAllAminities = async () => {
  // const roomQuery = new QueryBuilder(Room.find(), query)
  //   .search(RoomSearchableFields)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields()

  const result = await Aminity.find()
  // const meta = await roomQuery.countTotal()
  // return {
  //   meta,
  //   result,
  // }
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'The aminities were found empty.')
  }
  return result
}

const updateAminityIntoDB = async (id: string, payload: Partial<IAminity>) => {
  // check if the aminity exists
  const aminity = await Aminity.isAminityExists(id)
  if (!aminity) {
    throw new AppError(httpStatus.NOT_FOUND, 'Aminity not found!')
  }
  const isDeletedAminity = aminity?.isDeleted
  if (isDeletedAminity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Aminity already deleted!')
  }

  // Update the aminity document
  const updatedAminity = await Aminity.findByIdAndUpdate(id, payload, {
    new: true,
  })

  return updatedAminity
}

// delete aminity(softDelete) from db
const deleteAminityFromDB = async (id: string) => {
  const aminity = await Aminity.isAminityExists(id)
  if (!aminity) {
    throw new AppError(httpStatus.NOT_FOUND, 'Aminity not found!')
  }
  const isDeletedAminity = aminity.isDeleted
  if (isDeletedAminity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Aminity already deleted!')
  }

  const result = await Aminity.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const AminityServices = {
  createAminityIntoDB,
  //   getSingleRoomFromDB,
  getAllAminities,
  updateAminityIntoDB,
  deleteAminityFromDB,
}
