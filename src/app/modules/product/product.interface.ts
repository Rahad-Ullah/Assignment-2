import { Model } from 'mongoose'

export type TVariant = {
  type: string
  value: string
}

export type TInventory = {
  quantity: number
  inStock: boolean
}

export interface TProduct {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: TVariant[]
  inventory: TInventory
}

// for creating isProductExist method
export interface ProductModel extends Model<TProduct> {
  // eslint-disable-next-line no-unused-vars
  isProductExist(name: string): Promise<TProduct | null>
}
