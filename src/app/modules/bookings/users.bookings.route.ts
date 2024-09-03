import express from 'express'
import { BookingController } from './bookings.controller'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()
router.get('/', Auth(USER_ROLE.user), BookingController.getAllUserBookings)
export const UsersBookingRoutes = router
