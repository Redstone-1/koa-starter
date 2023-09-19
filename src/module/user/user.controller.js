import jwt from 'jsonwebtoken';
import userService from './user.service';
import {
  userRegisterError
} from '../../error/errorTypes';
import { genResponse } from '../../error';
import { JWT_SECRET } from '../../config';

const {
  createUser,
  getUserInfo,
  updateById,
} = userService;

class UserController {
  async register(ctx) {
    // 1. 获取数据
    const { userName, password } = ctx.request.body;

    // 2. 操作数据库
    try {
      const res = await createUser(userName, password);
      // 3. 返回结果
      ctx.body = genResponse(httpCodes.OK, '用户注册成功', {
        id: res.id,
        userName: res.userName,
      });
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userRegisterError, ctx);
    }
  }

  async login(ctx) {
    const { userName } = ctx.request.body;

    // 1. 获取用户信息(在token的payload中, 记录id, userName, isAdmin)
    try {
      // 从返回结果对象中剔除password属性, 将剩下的属性放到res对象
      const userInfo = await getUserInfo({ userName });

      if (userInfo?.password) {
        delete userInfo.password;
      }

      ctx.body = genResponse(httpCodes.OK, '用户登录成功', { token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }) })
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
      ctx.body = genResponse(httpCodes.OK, '修改密码成功', true)
    } else {
      ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '修改密码失败')
    }
    // 3. 返回结果
  }
}

export default new UserController();
