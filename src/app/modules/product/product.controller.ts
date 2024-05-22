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

// retrieve all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductsFromDB()

    // send response
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

    const result = await ProductService.updateProductIntoDB(
      productId,
      productData,
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
}
