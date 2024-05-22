import { Request, Response } from 'express'
import { ProductService } from './product.service'
import productValidationSchema from './product.validation'

// create a single product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body

    // data validation using zod
    const zodParsedData = productValidationSchema.parse(productData)

    const result = await ProductService.creatProductIntoDB(zodParsedData)

    // send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
