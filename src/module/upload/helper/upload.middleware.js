import { serverError } from "../../../error/handleError";
import { overLimitSize } from './upload.error';

export const verifyFileSize = async (ctx, next) => {
  try {
    const { file } = ctx.request.files;
    const { size } = file || {};
    if (size > 3 * 1024 * 1024) {
      ctx.body = overLimitSize
      return
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', serverError, ctx);
    return;
  }

  await next();
};
