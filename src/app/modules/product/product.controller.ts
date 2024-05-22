/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ProductService } from './product.service'
import productValidationSchema from './product.validation'

// create a single product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body

    // data validation using zod
    const zodParsedData = productValidationSchema.parse(productData)

    const result = await ProductService.createProductIntoDB(zodParsedData)

    // send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

// retrieve single product by productId
const getProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductService.getProductFromDB(productId)

    // send response
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    // send error
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

// update product information
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const { productId } = req.params

    // zod validation
    const validatedData = productValidationSchema.parse(productData)

    const result = await ProductService.updateProductIntoDB(
      productId,
      validatedData,
    )

    // send response
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (error: any) {
    // send error
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

// delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductService.deleteProductFromDB(productId)

    // send response
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    })
  } catch (error: any) {
    // send error
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

// search product
const searchProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string
    const result = await ProductService.searchProductInDB(searchTerm)

    // send response
    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    // send error
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

export const ProductControllers = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
}
