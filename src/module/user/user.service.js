import User from './user.model';

class UserService {
  async createUser(userName, password) {
    // 插入数据
    // await表达式: promise对象的值
    const res = await User.create({ userName, password });
    return res.dataValues;
  }

  async getUserInfo({ id, userName, password, isAdmin }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    userName && Object.assign(whereOpt, { userName });
    password && Object.assign(whereOpt, { password });
    isAdmin && Object.assign(whereOpt, { isAdmin });

    const res = await User.findOne({
      attributes: ['id', 'userName', 'password', 'isAdmin'],
      where: whereOpt,
    });

    return res ? res.dataValues : null;
  }

  async updateById({ id, userName, password, isAdmin }) {
    const whereOpt = { id };
    const newUser = {};

    userName && Object.assign(newUser, { userName });
    password && Object.assign(newUser, { password });
    isAdmin && Object.assign(newUser, { isAdmin });

    const res = await User.update(newUser, { where: whereOpt });
    return res[0] > 0 ? true : false;
  }
}

export default new UserService();
