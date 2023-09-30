import heroService from '../hero.service';
import {
  heroDoesNotExist,
  heroAlreadyExited,
} from '../error';
import { serverError } from '../../../error/handleError'

export const verifyHeroNotExist = async (ctx, next) => {
  const { heroName } = ctx.request.query;
  try {
    const res = await heroService.get({ heroName });
    if (!res) {
      console.error('英雄不存在', { heroName });
      ctx.app.emit('error', heroDoesNotExist, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', serverError, ctx);
    return;
  }

  await next();
};
export const verifyHeroIsExist = async (ctx, next) => {
  const { heroName } = ctx.request.body;
  try {
    const res = await heroService.get({ heroName });

    if (res) {
      console.error('英雄已经存在存在', { heroName });
      ctx.app.emit('error', heroAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', serverError, ctx);
    return;
  }

  await next();
};
