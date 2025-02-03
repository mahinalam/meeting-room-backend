import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { User } from './user.model'
import AppError from '../../errors/appError'

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body
  console.log('user', user)
  const result = await UserServices.createUserIntoDB(user)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  })
})
const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const loggedUser = req.body
  //   const zodParseData = StudentValidationSchema.parse(studentData)

  // check if the user is exists
  const user = await User.find({ email: loggedUser.email })
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'unauthorized access')
  }

  const result = await UserServices.loginUserIntoDB(loggedUser)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    token: result.accessToken,
    message: 'User logged in successfully',
    data: result.result,
  })
})

const getMe = catchAsync(async (req, res) => {
  const { email } = req.user
  const result = await UserServices.getMe(email)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User retrieved successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  loginUser,
  getMe,
}
