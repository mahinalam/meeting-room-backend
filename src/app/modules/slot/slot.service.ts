/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { ISlot } from './slot.interface'
import { Slot } from './slot.model'

const createSlotIntoDB = async (payload: ISlot) => {
  const { startTime, endTime, room, date } = payload
  let slots = []
  let currentStartTime = new Date(`${date}T${startTime}`)
  const finalEndTime = new Date(`${date}T${endTime}`)

  while (currentStartTime < finalEndTime) {
    let nextStartTime = new Date(currentStartTime)
    nextStartTime.setHours(nextStartTime.getHours() + 1)

    if (nextStartTime > finalEndTime) {
      break
    }

    const slot = new Slot({
      room: room,
      date: date,
      startTime: currentStartTime.toTimeString().split(' ')[0].substring(0, 5),
      endTime: nextStartTime.toTimeString().split(' ')[0].substring(0, 5),
      isBooked: false,
    })

    slots.push(slot)
    currentStartTime = nextStartTime
  }

  await Slot.insertMany(slots)
  return slots
}

// get available slots
const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  // if (Object.keys(query).length > 0) {
  const { date, roomId } = query
  // }
  let filter = {}
  if (date) {
    ;(filter as any).date = date
  }
  if (roomId) {
    ;(filter as any).room = roomId
  }

  const slots = await Slot.find(filter).populate('room')
  if (slots.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No time slots found')
  }
  const availableSlots = slots.filter((slot) => slot.isBooked === false)
  return availableSlots
}

// get single slot

const updateSlotsIntoDB = async (slotIds: string[]) => {
  const result = await Slot.updateMany(
    { _id: { $in: slotIds } },
    { $set: { isBooked: true } },
  )
  return result
}

export const SlotService = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
  updateSlotsIntoDB,
}
