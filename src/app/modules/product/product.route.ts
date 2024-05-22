import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

// create a single product
router.post('/', ProductControllers.createProduct)

// retrieve all products
router.get('/', ProductControllers.getAllProducts)

// retrieve single product
router.get('/:productId', ProductControllers.getProduct)

// update product information
router.put('/:productId', ProductControllers.updateProduct)

// delete product
router.delete('/:productId', ProductControllers.deleteProduct)

export const ProductRoutes = router
