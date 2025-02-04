/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IAminity {
  _id: string
  title: string
  image: string
  isDeleted: boolean
}

export interface AminityModel extends Model<IAminity> {
  isAminityExists(id: string): Promise<IAminity>
  isAminityDeleted(): Promise<IAminity | null>
}
