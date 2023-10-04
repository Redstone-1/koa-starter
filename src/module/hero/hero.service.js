import { Op } from '@sequelize/core';
import sequelize from '../../db/sequelize';
import Hero from './hero.model';
import HeroImage from './sub-module/image/image.model';
import { formatTime } from '../../utils/formatTime';

class HeroService {
  async create({ heroName, date, strongLevel, position, imgIds = '' }) {
    try {
      const hero = await Hero.create({
        heroName,
        date,
        strongLevel,
        position,
        imgIds: (imgIds?.split(',') || []).filter(id => id).join(',')
      });
      return hero ? true : false
    } catch (error) {
      console.log('英雄新增失败', error)
      return false
    }
  }

  /**
   * transaction 建立一个事务
   * 事务是指一次操作多个数据库，要么全部成功要么全部失败，确保多表操作的一致性
   * 图片上传与保存其实是比较特殊的场景，使用外键关联会比较麻烦
   * 其实多表情况下也可以使用表关联，例如一对多的建立关系
   */
  async get({ heroId = '', heroName = '', imgIds = '' }) {
    const t = await sequelize.transaction()
    try {
      let heroImage = []
      const whereHeroOpt = {};

      heroId && Object.assign(whereHeroOpt, { heroId });
      heroName && Object.assign(whereHeroOpt, { heroName });

      const hero = await Hero.findOne({ where: whereHeroOpt, transaction: t });

      if (imgIds) {
        heroImage = await HeroImage.findAll(
          {
            where: {
              imgId: imgIds.split(',').filter(id => id) || []
            },
            attributes: ['imgName', 'imgId'],
            transaction: t
          }
        );
      }

      if (hero) {
        const { date, createdAt, updatedAt } = hero.dataValues
        const { date: newDate } = formatTime({ date }, 'YYYY-MM-DD');
        const {
          createdAt: newCreatedAt,
          updatedAt: newUpdatedAt
        } = formatTime({ createdAt, updatedAt });

        hero.dataValues = {
          ...hero.dataValues,
          date: newDate,
          heroImage,
          createdAt: newCreatedAt,
          updatedAt: newUpdatedAt
        };
      }
      await t.commit()
      return hero ? hero.dataValues : null;
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
      imgIds && Object.assign(newHero, { imgIds: (imgIds?.split(',') || []).filter(id => id).join(',') });

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
