import z from 'zod'
import { userRole } from './user.constant'

const nameSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
})

const createUserValidationSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .trim(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6)
      .trim(),
    phone: z
      .string({
        required_error: 'Phone is required',
      })
      .optional(),
    city: z
      .string({
        required_error: 'City is required',
      })
      .optional(),
    role: z.enum(userRole as [string, ...string[]]).optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
})

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email().trim(),
    password: z.string().trim(),
  }),
})

export const UserValidationSchema = {
  createUserValidationSchema,
  loginValidationSchema,
}
