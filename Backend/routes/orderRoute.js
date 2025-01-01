import express from 'express';
import {placeOrder,allOrders,userOrders,orderStats,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express. Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)


// User Feature
orderRouter.post('/userorders', authUser, userOrders)

orderRouter.get('/stats', adminAuth, orderStats)

export default orderRouter

// orderRouter.post('/stripe', authUser, placeOrderStripe)
// orderRouter.post('/razorpay', authUser, placeOrderRazorpay)