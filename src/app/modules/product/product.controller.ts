import { Request, Response } from 'express'
import { ProductService } from './product.service'

// create a single product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const result = await ProductService.creatProductIntoDB(productData)

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


export const ProductControllers = {
    createProduct,
}