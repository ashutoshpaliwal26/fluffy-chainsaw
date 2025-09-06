// /src/routes/product.routes.ts

import { Router } from 'express';
import { createProduct , getAllProducts, getProductById, updateProduct, deleteProduct} from '../controller/productController';
import { adminAuth, userAuth } from '../middleware/authenticate';

const productRouter = Router();

productRouter.route('/')
  .post(adminAuth, createProduct) // Validation removed
  .get(getAllProducts);

productRouter.route('/:id')
  .get(getProductById)
  .put(adminAuth, updateProduct) // Validation removed
  .delete(adminAuth, deleteProduct);

export default productRouter;