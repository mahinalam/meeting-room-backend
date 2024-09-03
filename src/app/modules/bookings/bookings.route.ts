import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BookingsValidationSchema } from './bookings.validation'
import { BookingController } from './bookings.controller'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.user),
  validateRequest(BookingsValidationSchema.createBookingsValidationSchema),
  BookingController.createBooking,
)
router.get('/', Auth(USER_ROLE.admin), BookingController.getAllBookings)
router.put(
  '/:id',
  Auth(USER_ROLE.admin),
  validateRequest(BookingsValidationSchema.updateBookingsValidationSchema),
  BookingController.updateBooking,
)
router.delete('/:id', Auth(USER_ROLE.admin), BookingController.deleteBooking)

export const BookingsRoutes = router
