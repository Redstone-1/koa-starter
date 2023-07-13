import KoaRouter from 'koa-router';
import UserRouter from './user.router';

const router = new KoaRouter();

router.use(UserRouter.routes());

export default router;
