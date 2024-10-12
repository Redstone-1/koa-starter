import { DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize';

const User = sequelize.define('User', {
  // id 会被 sequelize 自动创建, 管理
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一',
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码',
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',
  },
});

// 本地开发，更改 model 数据结构后把此功能打开同步表模型，生产上 model 是固定的，不要使用
User.sync({ alter: true });

export default User;
