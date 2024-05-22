import { z } from 'zod'

// variant validation schema
const variantValidationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
})

// inventory validation schema
const inventoryValidationSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be a positive integer'),
  inStock: z.boolean(),
})

// product validation schema
const productValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string().min(1, 'Each tag must be a string')),
  variants: z
    .array(variantValidationSchema)
    .min(1, 'At least one variant is required'),
  inventory: inventoryValidationSchema,
})

export default productValidationSchema
