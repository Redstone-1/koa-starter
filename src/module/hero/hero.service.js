import { Op } from '@sequelize/core';
import Hero from './hero.model';
import { formatTime } from '../../utils/formatTime';

class HeroService {
  async createHero(bodyData) {
    const { heroName, date, strongLevel, position } = bodyData;
    const res = await Hero.create({ heroName, date, strongLevel, position });
    return res.dataValues;
  }

  async getHeroInfo({ heroName = '' }) {
    const whereOpt = {};

    heroName && Object.assign(whereOpt, { heroName });

    const res = await Hero.findOne({
      where: whereOpt,
    });

    if (res?.id) {
      const { date } = formatTime({ date: res.dataValues.date }, 'YYYY-MM-DD');
      const { createdAt, updatedAt } = formatTime({ createdAt: res.dataValues.createdAt, updatedAt: res.dataValues.updatedAt });

      res.dataValues = {
        ...res.dataValues,
        date,
        createdAt,
        updatedAt
      };
    }

    return res?.id ? res.dataValues : null;
  }

  async getAllHeroInfo({ heroName = '', date = '', strongLevel = '', position = [], pageNum = 1, pageSize = 10 }) {
    const whereOpt = {};

    heroName && Object.assign(whereOpt, { heroName });
    date && Object.assign(whereOpt, { date });
    strongLevel && Object.assign(whereOpt, { strongLevel });
    position && Object.assign(whereOpt, { position: { [Op.or]: position }  });

    const { count, rows } = await Hero.findAndCountAll({
      where: whereOpt,
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
    });

    const newRows = rows.map((item) => {
      const { date } = formatTime({ date: item.dataValues.date }, 'YYYY-MM-DD');
      const { createdAt, updatedAt } = formatTime({ createdAt: item.dataValues.createdAt, updatedAt: item.dataValues.updatedAt });
      item.dataValues = {
        ...item.dataValues,
        date,
        createdAt,
        updatedAt
      };
      return item;
    });

    return {
      pageNum,
      pageSize,
      total: count,
      data: newRows,
    };
  }

  async updateHero({ heroName = '', date = '', strongLevel = '', position = '' }) {
    const whereOpt = { heroName };
    const newHero = {};

    heroName && Object.assign(newHero, { heroName });
    date && Object.assign(newHero, { date });
    strongLevel && Object.assign(newHero, { strongLevel });
    position && Object.assign(newHero, { position });

    const res = await Hero.update(newHero, { where: whereOpt });
    return res?.[0] > 0;
  }

  async deleteHero({ heroName = '' }) {
    const whereOpt = { heroName };

    const res = await Hero.destroy({ where: whereOpt });
    return res > 0;
  }
}

export default new HeroService();
