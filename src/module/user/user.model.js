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

export default User;
