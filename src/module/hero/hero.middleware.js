import heroService from './hero.service';
import {
  heroDoesNotExist,
  heroAlreadyExited,
} from './hero.error';
import { serverError } from '../../error/handleError'

export const verifyHeroNotExist = async (ctx, next) => {
  try {
    const { heroName } = ctx.request.body;
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
  try {
    const { heroName, heroId } = ctx.request.body;
    const res = await heroService.get({ heroName, heroId });

    if (res) {
      console.error('英雄已经存在存在', { heroName, heroId });
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
