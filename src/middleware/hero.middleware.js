import heroService from '../module/hero/hero.service';
import {
  heroDoesNotExist,
  heroAlreadyExited,
} from "../error/errorTypes";

const { getHeroInfo } = heroService;

export const verifyHeroNotExist = async (ctx, next) => {
  const { heroName } = ctx.request.query;
  try {
    const res = await getHeroInfo({ heroName });
    if (!res.id) {
      console.error('英雄不存在', { heroName });
      ctx.app.emit('error', heroDoesNotExist, ctx);
      return;
    }
  } catch (err) {
    return;
  }

  await next();
};
export const verifyHeroIsExist = async (ctx, next) => {
  const { heroName } = ctx.request.body;
  try {
    const res = await getHeroInfo({ heroName });

    if (res.id) {
      console.error('英雄已经存在存在', { heroName });
      ctx.app.emit('error', heroAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    return;
  }

  await next();
};
