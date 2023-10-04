import Hero from './hero.model';
import {
  heroDoesNotExist,
  heroAlreadyExited,
} from './hero.error';
import { serverError } from '../../error/handleError'

export const verifyHeroNotExist = async (ctx, next) => {
  try {
    const { heroName } = ctx.request.body;
    const hero = await Hero.findOne({ where: { heroName } });
    if (!hero) {
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
    const { heroName } = ctx.request.body;
    const hero = await Hero.findOne({ where: { heroName } });
    console.log(
      '%c log-by-xier %c hero ',
      'background: #41b883; padding: 6px; border-radius: 1px 0 0 1px;  color: #fff',
      'background: #35495e; padding: 6px; border-radius: 0 1px 1px 0;  color: #fff',
      hero
    );
    if (hero) {
      console.error('英雄已经存在', { heroName });
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
