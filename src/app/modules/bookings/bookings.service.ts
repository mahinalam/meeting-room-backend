/* eslint-disable @typescript-eslint/no-explicit-any */
import { Room } from '../room/room.model'
import { IBookings } from './bookings.interface'
import { Booking } from './bookings.model'

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
  return result
}
const getAllUserBookingsFromDB = async (email: string) => {
  const result = await Booking.find()
    .populate('room')
    .populate('user', 'email')
    .populate('slots')
  const userBookings = result.filter((booking) => (booking as any).user.email === email)
  return userBookings
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
