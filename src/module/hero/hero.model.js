import { DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize';

const Hero = sequelize.define('Hero', {
  // id 会被 sequelize 自动创建, 管理
  heroId: {
    type: DataTypes.UUID,
    allowNull: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  heroName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '英雄名, 唯一',
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.ENUM(['1', '2', '3', '4', '5']),
    allowNull: false,
  },
  strongLevel: {
    type: DataTypes.ENUM(['T0', 'T1', 'T2', 'T3']),
    allowNull: false,
  },
  imgIds: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// 本地开发，更改 model 数据结构后把此功能打开同步表模型，生产上 model 是固定的，不要使用
Hero.sync({ alter: true }).then(() => console.log('同步成功')).catch(() => console.log('同步失败'));

export default Hero;
