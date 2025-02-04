import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingService } from './bookings.service'
import httpStatus from 'http-status'

// create booking
const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const booking = req.body
  const { userId } = req.user
  const result = await BookingService.createBookingIntoDB(userId, booking)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking created successfully',
    data: result,
  })
})
// get all bookings
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingsFromDB()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All bookings retrieved successfully',
    data: result,
  })
})

// get all bookings
const getAllUserBookings: RequestHandler = catchAsync(async (req, res) => {
  const email = req.user?.email
  const result = await BookingService.getAllUserBookingsFromDB(email)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User bookings retrieved successfully',
    data: result,
  })
})

// update booking
const updateBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const updatedBooking = req.body
  const result = await BookingService.updateBookingIntoDB(id, updatedBooking)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking updated successfully',
    data: result,
  })
})
// delete booking
const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookingService.deleteBookingFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking deleted successfully',
    data: result,
  })
})

export const BookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getAllUserBookings,
}
