import KoaRouter from 'koa-router';
import { auth } from '../../middleware/auth.middleware';
import heroController from './hero.controller';
import { verifyHeroNotExist, verifyHeroIsExist } from './middleware/hero.middleware'

const router = new KoaRouter({ prefix: '/hero' });

// 新增接口
router.post('/create', auth, verifyHeroIsExist, heroController.create);

// 删除接口
router.post('/delete', auth, verifyHeroNotExist, heroController.delete);

// 修改接口
router.post('/update', auth, verifyHeroNotExist, heroController.update);

// 获取单个英雄信息
router.get('/getHero', heroController.get);

// 获取英雄列表
router.post('/getHeroList', heroController.getAll);

export default router;
