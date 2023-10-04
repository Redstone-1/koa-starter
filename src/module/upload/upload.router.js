import KoaRouter from 'koa-router';
import { auth } from '../../middleware/auth.middleware';
import { verifyFileSize } from './upload.middleware';

const router = new KoaRouter({ prefix: '/file' });

// 新增接口
router.post('/upload', auth, verifyFileSize);

export default router;
