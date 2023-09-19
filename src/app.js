import Koa from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import koaParameter from 'koa-parameter';
import path from 'path';
import router from './router';
import { watchErrors } from './error';

const app = new Koa();

// 解决本地开发跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配制选项 option 里, 不推荐使用相对路径
      // 在 option 里的相对路径, 不是相对的当前文件. 相对 process.cwd()
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(async (ctx, next) => {
  try {
    if (typeof ctx.request.body === 'string') {
      ctx.request.body = JSON.parse(ctx.request.body);
    }
    await next();
  } catch (error) {
    await next();
  }
});
app.use(koaStatic(path.join(__dirname, '../upload')));
app.use(koaParameter(app));

app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on('error', watchErrors);

export default app;
