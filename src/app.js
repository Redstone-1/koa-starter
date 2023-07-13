import Koa from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import koaParameter from 'koa-parameter';
import path from 'path';
import router from './router';
import { errorHandler } from './error';

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(koaStatic(path.join(__dirname, '../upload')));
app.use(koaParameter(app));

app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on('error', errorHandler);

export default app;
