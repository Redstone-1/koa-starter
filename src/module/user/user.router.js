import KoaRouter from 'koa-router';
import {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} from './middleware/user.middleware';
import { auth } from '../../middleware/auth.middleware';
import userController from './user.controller';

const router = new KoaRouter({ prefix: '/users' });

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, userController.register);

// 登录接口
router.post('/login', userValidator, verifyLogin, userController.login);

// 修改密码接口
router.patch('/changePassword', auth, crpytPassword, userController.changePassword);

export default router;
