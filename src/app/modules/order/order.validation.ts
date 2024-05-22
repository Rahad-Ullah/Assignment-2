import { z } from 'zod'

// order validaton shcema using zod
const OrderValidationSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  productId: z.string().min(1, 'ProductId is required'),
  price: z.number().positive().min(0, 'Price must be a positive number'),
  quantity: z
    .number()
    .int()
    .positive()
    .min(0, 'Quantity must be a positive number'),
})

export default OrderValidationSchema
