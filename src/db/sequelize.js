import { Sequelize } from 'sequelize';
import {
  MYSQL_HOST,
  // MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} from '../config';

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  dialectOptions: {
    dateStrings: true,
    timezone: '+08:00', // 设置为中国时区
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(err => {
    console.log('数据库连接失败', err);
  });

export default sequelize;
