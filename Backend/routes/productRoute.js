import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct,updateProduct,getProductStats } from "../controllers/productController.js";
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.post('/remove',adminAuth, removeProduct);
productRouter.post('/single/:id', singleProduct);
productRouter.post('/list', listProduct)
productRouter.post(
    '/update',
    adminAuth,
    upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]),
    updateProduct
);
productRouter.get('/stats', getProductStats);

export default productRouter;

// import express from 'express';
// import {addProduct,listProduct,removeProduct,singleProduct} from "../controllers/productController.js"
// import upload from '../middleware/multer.js';

// const productRouter=express.Router();

// productRouter.post('/add',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
// productRouter.post('/remove',removeProduct)
// productRouter.post('/single',singleProduct)
// productRouter.post('/list',listProduct)

// export default productRouter