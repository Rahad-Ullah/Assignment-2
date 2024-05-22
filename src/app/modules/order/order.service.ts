/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '../product/product.model'
import { TOrder } from './order.interface'
import { Order } from './order.model'

// create a new order into DB
const createOrderIntoDB = async (orderData: TOrder) => {
  const product = await Product.findById({ _id: orderData.productId })
  const availQuantity: any = product?.inventory.quantity
  const updatedQuantity = availQuantity - orderData.quantity

  //throw error if insufficient stock
  if (availQuantity && orderData.quantity > availQuantity) {
    throw new Error('Insufficient quantity available in inventory')
  }
  const result = await Order.create(orderData)

  //update inventory stock
  await Product.findByIdAndUpdate(orderData.productId, {
    'inventory.quantity': updatedQuantity,
  })

  //update instock
  if (updatedQuantity <= 0) {
    await Product.findByIdAndUpdate(orderData.productId, {
      'inventory.inStock': false,
    })
  }
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
