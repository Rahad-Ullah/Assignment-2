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

// retrieve single product by Id
const getProductFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId })
  return result
}

// update product information
const updateProductIntoDB = async (
  productId: string,
  productData: TProduct,
) => {
  const query = { _id: productId }
  const update = {
    $set: productData,
  }
  const options = { new: true }
  const result = await Product.findOneAndUpdate(query, update, options)
  return result
}

// delete a product from DB
const deleteProductFromDB = async (productId: string) => {
  const result = await Product.deleteOne({ _id: productId })
  return result && null
}

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
