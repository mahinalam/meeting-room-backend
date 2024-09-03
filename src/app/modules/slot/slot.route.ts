import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SlotController } from './slot.controller'
import { SlotValidationSchema } from './slot.validation'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(SlotValidationSchema.createSlotValidationSchema),
  SlotController.createSlot,
)
router.get('/availability', SlotController.getAvailableSlots)
router.put('/', Auth(USER_ROLE.user), SlotController.updateSlots)

// router.get('/', RoomController.getAllRooms)
// router.put(
//   '/:id',
//   validateRequest(RoomValidationSchema.updateRoomValidationSchema),

//   RoomController.updateRoom,
// )
// router.delete('/:id', RoomController.deleteRoom)

export const SlotRoutes = router
