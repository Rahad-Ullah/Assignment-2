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

// search a product in DB
const searchProductInDB = async (searchTerm: string) => {
  if (searchTerm) {
    const result = await Product.find({
      name: { $regex: searchTerm, $options: 'i' },
    })
    return result
  }
  // if no searchTerm exist, return all products
  const result = await Product.find()
  return result
}

export const ProductService = {
  createProductIntoDB,
  getProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  searchProductInDB,
}
