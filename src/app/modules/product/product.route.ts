import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

// create a new product
router.post('/', ProductControllers.createProduct)

// retrieve single product
router.get('/:productId', ProductControllers.getProduct)

// update product information
router.put('/:productId', ProductControllers.updateProduct)

// delete product
router.delete('/:productId', ProductControllers.deleteProduct)

// search product
router.get('/', ProductControllers.searchProduct)

export const ProductRoutes = router
