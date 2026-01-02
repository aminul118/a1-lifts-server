import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import { BlogControllers } from './blog.controller';
import checkAuth from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = Router();

router.get('', BlogControllers.getAllBlogs);
router.get('/:slug', BlogControllers.getSingleBlog);
router.post(
  '/create',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single('file'),
  BlogControllers.createBlogs,
);
router.put(
  '/:slug',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BlogControllers.updateBlogs,
);
router.delete(
  '/:slug',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BlogControllers.deleteSingleBlogs,
);

export const BlogRouter = router;
