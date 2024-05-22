import { Schema, model } from 'mongoose'
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface'

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
})

const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
})

// * custom method for checking product existence in DB
productSchema.statics.isProductExist = async function (name: string) {
  const existingProduct = await Product.findOne({ name })
  return existingProduct
}

export const Product = model<TProduct, ProductModel>('Product', productSchema)
