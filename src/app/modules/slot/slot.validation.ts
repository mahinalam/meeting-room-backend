import { z } from 'zod'

const createSlotValidationSchema = z.object({
  body: z.object({
    room: z.string().trim(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    isBooked: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
  // .refine(
  //   (body) => {
  //     const start = new Date(`1970-01-01T${body.startTime}:00`)
  //     const end = new Date(`1970-01-01T${body.endTime}:00`)
  //     return end > start
  //   },
  //   {
  //     message: 'Start time should be before than End Time!',
  //   },
  // ),
})
// const updateSlotValidationSchema = z.object({
//   body: z.object({
//     room: z.string().trim().optional(),
//     date: z.string().optional(),
//     startTime: z.string().optional(),
//     endTime: z.string().optional(),
//     isBooked: z.boolean().optional(),
//     isDeleted: z.boolean().optional(),
//   }),
//   // .refine(
//   //   (body) => {
//   //     const start = new Date(`1970-01-01T${body.startTime}:00`)
//   //     const end = new Date(`1970-01-01T${body.endTime}:00`)
//   //     return end > start
//   //   },
//   //   {
//   //     message: 'Start time should be before than End Time!',
//   //   },
//   // ),
// })

export const SlotValidationSchema = {
  createSlotValidationSchema,
  // updateSlotValidationSchema,
}
