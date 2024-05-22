import { TProduct } from './product.interface'
import { Product } from './product.model'

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExist(productData.name)) {
    throw new Error('Product already exists!')
  }

  const result = await Product.create(productData)
  return result
}

export const ProductService = {
    createProductIntoDB,
}
