import { Response } from 'express'

interface ISendResponse<T> {
  statusCode: number
  success: boolean
  message?: string
  token?: string
  data: T
}

const sendResponse = <T>(res: Response, data: ISendResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    data: data.data,
  })
}

export default sendResponse
