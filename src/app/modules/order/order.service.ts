import { TOrder } from './order.interface'
import { Order } from './order.model'

// create a new order into DB
const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData)
  return result
}

// retrieve orders
const getOrdersFromDB = async (email: string) => {
  if (email) {
    const result = await Order.find({ email: email })
    return result
  }
// if no email exist, get all orders
  const result = await Order.find()
  return result
}

export const OrderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
}
