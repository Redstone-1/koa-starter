import KoaRouter from 'koa-router';
// import {
//   verifyLogin
// } from '../middleware/user.middleware';
// import { auth } from '../middleware/auth.middleware';
import heroController from './hero.controller';

const {
  getHero,
  getAllHero,
  addHero,
  updateHero,
  delHero,
} = heroController;

const router = new KoaRouter({ prefix: '/hero' });

// 注册接口
router.post('/create', addHero);

// 登录接口
router.post('/delete', delHero);

// 修改密码接口
router.post('/update', updateHero);

router.get('/getHero', getHero);

router.post('/getHeroList', getAllHero);

export default router;
