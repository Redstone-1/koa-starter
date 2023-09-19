import heroService from './hero.service';
import httpCodes from '../../error/httpCodes';
import { serverError } from '../../error/errorTypes';
import { genResponse } from '../../error';

const {
  createHero,
  getHeroInfo,
  getAllHeroInfo,
  updateHero,
  deleteHero,
} = heroService;

class HeroController {
  async addHero(ctx) {
    // 2. 操作数据库
    try {
      const res = await createHero(ctx.request.body);
      // 3. 返回结果
      if (res) {
        ctx.body = genResponse(httpCodes.OK, '英雄新增成功', true)
      } else {
        ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '英雄新增失败')
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', serverError, ctx);
    }
  }

  async updateHero(ctx) {
    // 1. 获取数据
    const { heroName, date, strongLevel, position } = ctx.request.body;

    // 2. 操作数据库
    try {
      const res = await updateHero({ heroName, date, strongLevel, position });
      // 3. 返回结果
      if (res) {
        ctx.body = genResponse(httpCodes.OK, '英雄信息修改成功', true)
      } else {
        ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '英雄信息修改失败')
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', serverError, ctx);
    }
  }

  async getAllHero(ctx) {
    // 1. 获取数据
    const { heroName, date, strongLevel, position, pageNum, pageSize } = ctx.request.body;

    // 2. 操作数据库
    try {
      const res = await getAllHeroInfo({ heroName, date, strongLevel, position, pageNum, pageSize });
      // 3. 返回结果
      if (res) {
        ctx.body = genResponse(httpCodes.OK, '英雄列表获取成功', res)
      } else {
        ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '英雄列表获取失败')
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', serverError, ctx);
    }
  }

  async getHero(ctx) {
    // 1. 获取数据
    const { heroName } = ctx.request.query;

    // 2. 操作数据库
    try {
      const res = await getHeroInfo({ heroName });

      // 3. 返回结果
      if (res) {
        ctx.body = genResponse(httpCodes.OK, '英雄信息获取成功', res)
      } else {
        ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '英雄信息获取失败')
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', serverError, ctx);
    }
  }
  async delHero(ctx) {
    // 1. 获取数据
    const { heroName } = ctx.request.body;

    // 2. 操作数据库
    try {
      const res = await deleteHero({ heroName });

      // 3. 返回结果
      if (res) {
        ctx.body = genResponse(httpCodes.OK, '英雄删除成功', true)
      } else {
        ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '英雄删除失败')
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', serverError, ctx);
    }
  }
}

export default new HeroController();
