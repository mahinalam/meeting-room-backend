import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { AminityController } from './aminity.controller'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.admin),
  //   validateRequest(RoomValidationSchema.createRoomValidationSchema),
  AminityController.createAminity,
)
router.get('/', AminityController.getAllAminities)
// router.put(
//   '/:id',
//   Auth(USER_ROLE.admin),
//   validateRequest(RoomValidationSchema.updateRoomValidationSchema),

//   RoomController.updateRoom,
// )
router.delete('/:id', Auth(USER_ROLE.admin), AminityController.deleteAminity)

export const AminityRoutes = router
