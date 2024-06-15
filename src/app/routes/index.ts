import { Router } from 'express'
import { userRoutes } from '../modules/user/user.route'
import { RoomRoutes } from '../modules/room/room.route'
import { SlotRoutes } from '../modules/slot/slot.route'
import { BookingsRoutes } from '../modules/bookings/bookings.route'
import { UsersBookingRoutes } from '../modules/bookings/users.bookings.route'
const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  {
    path: '/rooms',
    element: RoomRoutes,
  },
  {
    path: '/slots',
    element: SlotRoutes,
  },
  {
    path: '/bookings',
    element: BookingsRoutes,
  },
  {
    path: '/my-bookings',
    element: UsersBookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.element))

export default router
