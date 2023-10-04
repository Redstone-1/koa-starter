import { Op } from '@sequelize/core';
import sequelize from '../../db/sequelize';
import Hero from './hero.model';
import HeroImage from './image.model';
import { formatTime } from '../../utils/formatTime';

class HeroService {
  async create({ heroName, date, strongLevel, position, imgIds = '' }) {
    try {
      const hero = await Hero.create(
        { heroName, date, strongLevel, position, imgIds }
      );
      return hero ? true : false
    } catch (error) {
      console.log('英雄新增失败', error)
      return false
    }
  }

  async get({ heroId = '', imgIds = '' }) {
    const t = await sequelize.transaction()
    try {
      let heroImage = []
      const whereHeroOpt = { transaction: t };

      heroId && Object.assign(whereHeroOpt, { heroId });

      const res = await Hero.findOne(whereHeroOpt);


      if (imgIds) {
        heroImage = await HeroImage.findAll(
          {
            where: {
              imgId: imgIds.split(',') || []
            },
            attributes: ['imgName', 'imgId'],
            transaction: t
          }
        );
      }

      if (res) {
        const { date, createdAt, updatedAt } = res.dataValues
        const { date: newDate } = formatTime({ date }, 'YYYY-MM-DD');
        const {
          createdAt: newCreatedAt,
          updatedAt: newUpdatedAt
        } = formatTime({ createdAt, updatedAt });

        res.dataValues = {
          ...res.dataValues,
          date: newDate,
          heroImage,
          createdAt: newCreatedAt,
          updatedAt: newUpdatedAt
        };
      }
      await t.commit()
      return res ? res.dataValues : null;
    } catch (error) {
      console.log('英雄新增失败', error)
      t.rollback()
    }
  }

  async getAll({
    heroName = '',
    date = '',
    strongLevel = '',
    position = [],
    pageNum = 1,
    pageSize = 10
  }) {
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
      const { date, createdAt, updatedAt } = item.dataValues
      const { date: newDate } = formatTime({ date }, 'YYYY-MM-DD');
      const {
        createdAt: newCreatedAt,
        updatedAt: newUpdatedAt
      } = formatTime({ createdAt, updatedAt });

      item.dataValues = {
        ...item.dataValues,
        date: newDate,
        createdAt: newCreatedAt,
        updatedAt: newUpdatedAt
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

  async update({ heroId = '', heroName = '', date = '', strongLevel = '', position = '', imgIds = '' }) {
    try {
      const whereOpt = { heroId };
      const newHero = {};

      heroName && Object.assign(newHero, { heroName });
      date && Object.assign(newHero, { date });
      strongLevel && Object.assign(newHero, { strongLevel });
      position && Object.assign(newHero, { position });
      imgIds && Object.assign(newHero, { imgIds });

      const hero = await Hero.update(newHero, { where: whereOpt })
      return hero?.[0] > 0
    } catch (error) {
      console.log('英雄新增失败', error)
      return false
    }
  }

  async delete({ heroName = '' }) {
    const whereOpt = { heroName };

    const res = await Hero.destroy({ where: whereOpt });
    return res > 0;
  }

  async saveImage({ imgName }) {
    const res = await HeroImage.create({ imgName });
    return res.dataValues;
  }
}

export default new HeroService();
