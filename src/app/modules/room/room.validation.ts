import { z } from 'zod'

const createRoomValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim(),
    guestCapacity: z.number().min(1, 'Guest capacity must be at least 1'),
    images: z
      .array(z.string().url('Invalid image URL'))
      .min(1, 'At least one image is required'),
    adult: z.number().min(1, 'At least one adult is required'),
    bathRoom: z.number().min(1, 'At least one bathroom is required'),
    bedRoom: z.number().min(1, 'At least one bedroom is required'),
    child: z.number().min(0, 'Child count cannot be negative').optional(),
    location: z.string().min(1, 'Location is required').trim(),
    isDeleted: z.boolean().optional(),
  }),
})
const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().optional(),
    capacity: z.number().optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string()).optional(),
  }),
})

export const RoomValidationSchema = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
}
