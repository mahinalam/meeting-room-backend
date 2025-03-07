import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { RoomServices } from './room.service'
import catchAsync from '../../utils/catchAsync'
// create room
const createRoom: RequestHandler = catchAsync(async (req, res) => {
  const room = req.body
  const { userId } = req.user
  const result = await RoomServices.createRoomIntoDB(userId, room)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room added successfully',
    data: result,
  })
})

// get single room
const getSingleRoom: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await RoomServices.getSingleRoomFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room retrieved successfully',
    data: result,
  })
})
// get all rooms
const getAllRooms: RequestHandler = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomsFromDB()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Rooms retrieved successfully',
    data: result,
  })
})

// update room
const updateRoom: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await RoomServices.updateRoomIntoDB(id, payload)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room updated successfully',
    data: result,
  })
})

// delete room
const deleteRoom: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await RoomServices.deleteRoomFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Room deleted successfully',
    data: result,
  })
})

export const RoomController = {
  createRoom,
  getSingleRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
}
