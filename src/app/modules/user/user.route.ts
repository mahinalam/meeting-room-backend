import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserValidationSchema } from './user.validation'
import { USER_ROLE } from './user.constant'
import Auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/signup',
  // validateRequest(UserValidationSchema.createUserValidationSchema),
  UserController.createUser,
)
router.post(
  '/login',
  validateRequest(UserValidationSchema.loginValidationSchema),
  UserController.loginUser,
)

router.get(
  '/me',
  Auth(USER_ROLE.admin, USER_ROLE.guest, USER_ROLE.host),
  UserController.getMe,
)

export const userRoutes = router
