import { TProduct } from './product.interface'
import { Product } from './product.model'

// create a new product
const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExist(productData.name)) {
    throw new Error('Product already exists!')
  }
  const result = await Product.create(productData)
  return result
}

// retrieve all products
const getAllProductsFromDB = async () => {
  const result = await Product.find()
  return result
}

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
}
