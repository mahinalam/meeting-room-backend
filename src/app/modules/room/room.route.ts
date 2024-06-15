import express from 'express'
import { RoomValidationSchema } from './room.validation'
import { RoomController } from './room.controller'
import validateRequest from '../../middlewares/validateRequest'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(RoomValidationSchema.createRoomValidationSchema),
  RoomController.createRoom,
)
router.get('/:id', RoomController.getSingleRoom)
router.get('/', RoomController.getAllRooms)
router.put(
  '/:id',Auth(USER_ROLE.admin),
  validateRequest(RoomValidationSchema.updateRoomValidationSchema),

  RoomController.updateRoom,
)
router.delete('/:id',Auth(USER_ROLE.admin), RoomController.deleteRoom)

export const RoomRoutes = router
