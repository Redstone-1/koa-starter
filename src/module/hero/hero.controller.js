import heroService from './hero.service';
import httpCodes from '../../error/httpCodes';
import { serverError } from '../../error/handleError';
import { genResponse } from '../../error';

class HeroController {
  async create(ctx) {
    try {
      const { heroName, date, strongLevel, position, imgIds = '' } = ctx.request.body;
      const res = await heroService.create({ heroName, date, strongLevel, position, imgIds });

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

  async update(ctx) {
    try {
      const { heroName, date, strongLevel, position, heroId, imgIds = '' } = ctx.request.body;
      const res = await heroService.update({ heroName, date, strongLevel, position, heroId, imgIds });

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

  async getAll(ctx) {
    const { heroName, date, strongLevel, position, pageNum, pageSize } = ctx.request.body;

    try {
      const res = await heroService.getAll({ heroName, date, strongLevel, position, pageNum, pageSize });

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

  async get(ctx) {
    try {
      const { heroId, imgIds } = ctx.request.body;
      const res = await heroService.get({ heroId, imgIds });

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

  async delete(ctx) {
    try {
      const { heroName } = ctx.request.body;
      const res = await heroService.delete({ heroName });

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

  async saveImage(ctx) {
    try {
      const { file } = ctx.request.files;
      const res = await heroService.saveImage({ imgName: file.newFilename });
      if (res) {
        ctx.body = genResponse(httpCodes.OK, '图片保存成功', res.imgId)
      } else {
        ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '图片保存失败')
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', serverError, ctx);
    }
  }
}

export default new HeroController();
