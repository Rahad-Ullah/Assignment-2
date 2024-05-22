import { TProduct } from './product.interface'
import { Product } from './product.model'

const creatProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData)
  return result
}


export const ProductService = {
    creatProductIntoDB,
}