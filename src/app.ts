import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/order.route'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// app routes
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World')
})

// route not found error
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
  next()
})

export default app
