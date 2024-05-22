import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

// create a new order
router.post('/', OrderControllers.createOrder)

// retrieve orders
router.get('/', OrderControllers.getOrders)

export const OrderRoutes = router
