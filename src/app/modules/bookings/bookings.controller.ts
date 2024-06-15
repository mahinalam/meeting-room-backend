import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingService } from './bookings.service'
import httpStatus from 'http-status'

// create booking
const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const booking = req.body
  const result = await BookingService.createBookingIntoDB(booking)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Booking created successfully',
    data: result,
  })
})
// get all bookings
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingsFromDB()
  if (Object.keys(result).length === 0) {
    return sendResponse(res, {
      statusCodeNumber: httpStatus.NOT_FOUND,
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: result,
    })
  }
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
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
    if (Object.keys(result).length === 0) {
      return sendResponse(res, {
        statusCodeNumber: httpStatus.NOT_FOUND,
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: result,
      })
    }
    sendResponse(res, {
      statusCodeNumber: httpStatus.OK,
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
    statusCodeNumber: httpStatus.OK,
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
    statusCodeNumber: httpStatus.OK,
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
  getAllUserBookings
}
