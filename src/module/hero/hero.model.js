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
    type: DataTypes.STRING,
    allowNull: false,
  },
  strongLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 本地开发，更改 model 数据结构后把此功能打开同步表模型，生产上 model 是固定的，不要使用
// Hero.sync({ alter: true });

export default Hero;
