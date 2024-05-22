/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { OrderServices } from './order.service'
import OrderValidationSchema from './order.validation'

// creat new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body

    // data validation using zod
    const validatedData = OrderValidationSchema.parse(orderData)

    const result = await OrderServices.createOrderIntoDB(validatedData)

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
      message: error.message,
    })
  }
}

// retrieve orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string
    // validate email
    if (email && !email.includes('@')) {
      throw new Error('Invalid email')
    }
    const result = await OrderServices.getOrdersFromDB(email)

    // throw error if no data found
    if(result.length <= 0){
        throw new Error ('Order not found')
    }

    // send response
    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    // send error
    res.status(500).json({
      success: false,
      message: error?.message,
    })
  }
}

export const OrderControllers = {
  createOrder,
  getOrders,
}
