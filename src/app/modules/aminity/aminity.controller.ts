import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { AminityServices } from './aminity.service'

// create aminity
const createAminity: RequestHandler = catchAsync(async (req, res) => {
  const aminity = req.body

  const result = await AminityServices.createAminityIntoDB(aminity)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Aminity added successfully',
    data: result,
  })
})

// get all aminities
const getAllAminities: RequestHandler = catchAsync(async (req, res) => {
  const result = await AminityServices.getAllAminities()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Aminities retrieved successfully',
    data: result,
  })
})

// update aminity
const updateAminity: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await AminityServices.updateAminityIntoDB(id, payload)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Aminity updated successfully',
    data: result,
  })
})

// delete aminity
const deleteAminity: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await AminityServices.deleteAminityFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Aminity deleted successfully',
    data: result,
  })
})

export const AminityController = {
  createAminity,
  getAllAminities,
  updateAminity,
  deleteAminity,
}
