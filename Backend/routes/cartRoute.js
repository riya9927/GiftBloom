import express from 'express';
import {addToCart, updateCart, getUserCart, removeFromCart} from '../controllers/cartController.js'
import authUser from '../middleware/auth.js';

const cartRouter = express.Router()

cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/update', authUser, updateCart);
cartRouter.post('/remove', authUser, removeFromCart);

export default cartRouter

// import express from 'express';
// import {addToCart,updateCart,getUserCart} from '../controllers/cartController.js'
// import authUser from '../middleware/auth.js';

// const cartRouter = express.Router()

// cartRouter.post('/get',authUser, getUserCart);
// cartRouter.post('/add',authUser, addToCart);
// cartRouter.post('/update',authUser, updateCart);

// export default cartRouter