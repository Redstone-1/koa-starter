import jwt from 'jsonwebtoken';
import userService from '../service/user.service';
import {
  userRegisterError
} from '../error/errorTypes';
import { JWT_SECRET } from '../config';

const {
  createUser,
  getUerInfo,
  updateById,
} = userService;

class UserController {
  async register(ctx) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body;

    // 2. 操作数据库
    try {
      const res = await createUser(user_name, password);
      // console.log(res)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userRegisterError, ctx);
    }
  }

  async login(ctx) {
    const { user_name } = ctx.request.body;

    // 1. 获取用户信息(在token的payload中, 记录id, user_name, is_admin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const userInfo = await getUerInfo({ user_name });

      if (userInfo?.password) {
        delete userInfo.password;
      }

      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      };
    } catch (err) {
      console.error('用户登录失败', err);
    }
  }

  async changePassword(ctx) {
    // 1. 获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;

    // 2. 操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: '',
      };
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: '',
      };
    }
    // 3. 返回结果
  }
}

export default new UserController();
