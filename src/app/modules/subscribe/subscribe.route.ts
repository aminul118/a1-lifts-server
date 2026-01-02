import { Router } from 'express';
import { SubscribeController } from './subscribe.controller';
import checkAuth from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';

const router = Router();

router.post('/', SubscribeController.createSubscribe);
router.get(
  '/',
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SubscribeController.getAllSubscriber,
);

export const SubscribeRouter = router;
