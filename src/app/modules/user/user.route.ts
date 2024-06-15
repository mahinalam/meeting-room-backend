import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserValidationSchema } from './user.validation'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserController.createUser,
)
router.post(
  '/login',
  validateRequest(UserValidationSchema.loginValidationSchema),
  UserController.loginUser,
)

export const userRoutes = router
