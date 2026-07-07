import { Router } from 'express';
import checkAuth from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { multerUpload } from '../../config/multer.config';
import { ProductControllers } from './product.controller';

const router = Router();

router.get('/get-all', ProductControllers.getAllProducts);
router.get(
  '/get-all-product-category',
  ProductControllers.getAllProductCategory,
);
router.post(
  '/create',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single('file'),
  ProductControllers.createProducts,
);
router.delete(
  '/:id',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ProductControllers.deleteSingleProduct,
);
router.post(
  '/category',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ProductControllers.createProductCategory,
);

export const ProductRouter = router;
