import Koa from 'koa';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import koaParameter from 'koa-parameter';
import path from 'path';
import router from './router';
import { watchErrors } from './error';

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*'); // 解决本地开发跨域，生产上请将 * 替换为你的域名
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // 配置可接受的请求方法
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With'); // 配置可由前端操控的 headers 字段
  await next();
});

app.use(
  koaBody({
    /** multipart: true 才能解析 formdata 流 */
    multipart: true,
    formidable: {
      /**
       * upload src 同级，且必须存在，不存在会报错，血的教训...
       * 你也可以自定义存储位置，下面的 koaStatic 的路径需要和这里的路径保持一致
       */
      uploadDir: path.resolve(__dirname, '../upload'),
      /** 保留文件的扩展名 */
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

/**
 * 静态资源的路径也是一样的，文件上传到哪里，就将哪个文件夹用 koaStatic 处理下
 * 前端访问时不用加文件夹名称，直接 http://localhost:6419/图片名 进行访问
 * 不加 upload 是防止别人知道你文件存储在服务器的哪个位置
 */
app.use(koaStatic(path.resolve(__dirname, '../upload')));
app.use(koaParameter(app));
app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on('error', watchErrors);

export default app;
