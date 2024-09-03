/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { Room } from '../room/room.model'
import { IBookings } from './bookings.interface'
import { Booking } from './bookings.model'
import { User } from '../user/user.model'

const createBookingIntoDB = async (payload: IBookings) => {
  const room = await Room.findById(payload.room)
  const pricePerSlot = room?.pricePerSlot
  const totalAmount = Number(pricePerSlot) * Number(payload?.slots.length)
  const updatedBookingData = { ...payload, totalAmount }
  const result = (
    await (
      await (await Booking.create(updatedBookingData)).populate('room')
    ).populate('user')
  ).populate('slots')
  return result
}

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate('room')
    .populate('user')
    .populate('slots')
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No booking exists.')
  }
  return result
}
const getAllUserBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email })
  const result = await Booking.find({ user: user!._id })
    .populate('room')
    .populate('user', 'email')
    .populate('slots')
  return result
}

const updateBookingIntoDB = async (id: string, payload: Partial<IBookings>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true })
  return result
}
const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const BookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getAllUserBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
}
