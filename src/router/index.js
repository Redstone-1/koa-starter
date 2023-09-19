import KoaRouter from 'koa-router';
import userRouter from '../module/user/user.router';
import heroRouter from '../module/hero/hero.router';

const router = new KoaRouter();

router.use(userRouter.routes());
router.use(heroRouter.routes());

export default router;
