import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

// create a single product
router.post('/', ProductControllers.createProduct)

export const ProductRoutes = router
