import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import { BannerControllers } from './banner.controller';
import checkAuth from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = Router();

router.post(
  '/create',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single('file'),
  BannerControllers.createBanners,
);
router.get('/', BannerControllers.getAllBanners);
router.delete('/:id', BannerControllers.deleteSingleBanner);

export const BannerRouter = router;
