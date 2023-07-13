import KoaRouter from 'koa-router';
import {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
} from '../middleware/user.middleware';
import { auth } from '../middleware/auth.middleware';
import userController from '../controller/user.controller';

const {
  register,
  login,
  changePassword,
} = userController;

const router = new KoaRouter({ prefix: '/users' });

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register);

// 登录接口
router.post('/login', userValidator, verifyLogin, login);

// 修改密码接口
router.patch('/changePassword', auth, crpytPassword, changePassword);

router.get('/', async (ctx) => {
  ctx.body = 'hello';
});

export default router;
