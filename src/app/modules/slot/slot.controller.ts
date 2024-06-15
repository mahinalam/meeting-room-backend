import { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import httpStatus from "http-status"
import { SlotService } from "./slot.service"
import sendResponse from "../../utils/sendResponse"

// create slot
const createSlot: RequestHandler = catchAsync(async (req, res) => {
    const slot = req.body
    const result = await SlotService.createSlotIntoDB(slot)
    sendResponse(res, {
      statusCodeNumber: httpStatus.OK,
      success: true,
      statusCode: 200,
      message: 'Slots created successfully',
      data: result,
    })
  })

  // get available slots
const getAvailableSlots: RequestHandler = catchAsync(async (req, res) => {
    const result = await SlotService.getAvailableSlotsFromDB(req.query);
    if(result.length === 0){
      return sendResponse(res, {
        statusCodeNumber: httpStatus.NOT_FOUND,
        success: false,
        statusCode: 404,
        message: 'No Data Found',
        data: result,
      })
    }
    sendResponse(res, {
        statusCodeNumber: httpStatus.OK,
        success: true,
        statusCode: 200,
        message: 'Available slots retrieved successfully',
        data: result,
      })
  });

  export const SlotController = {
    createSlot,
    getAvailableSlots
  }