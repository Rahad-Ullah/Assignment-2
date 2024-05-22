/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { OrderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const result = await OrderServices.createOrderIntoDB(orderData)

    // send response
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error: any) {
    // send error
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

export const OrderControllers = {
  createOrder,
}
