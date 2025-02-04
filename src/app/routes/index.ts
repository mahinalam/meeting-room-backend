import { Router } from 'express'
import { userRoutes } from '../modules/user/user.route'
import { RoomRoutes } from '../modules/room/room.route'
import { BookingsRoutes } from '../modules/bookings/bookings.route'
import { UsersBookingRoutes } from '../modules/bookings/users.bookings.route'
import { AminityRoutes } from '../modules/aminity/aminity.route'
const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  {
    path: '/room',
    element: RoomRoutes,
  },
  {
    path: '/aminity',
    element: AminityRoutes,
  },
  {
    path: '/booking',
    element: BookingsRoutes,
  },
  {
    path: '/my-booking',
    element: UsersBookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.element))

export default router
