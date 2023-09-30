import jwt from 'jsonwebtoken';
import userService from './user.service';
import {
  userRegisterError,
  userLoginError,
} from '../../error/handleError';
import { genResponse } from '../../error';
import { JWT_SECRET } from '../../config';
import { serverError } from '../../error/handleError';
import httpCodes from '../../error/httpCodes';

class UserController {
  async register(ctx) {
    try {
      const { userName, password } = ctx.request.body;
      const res = await userService.create(userName, password);

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
    try {
      const { userName } = ctx.request.body;
      const userInfo = await userService.get({ userName });

      if (userInfo?.password) {
        delete userInfo.password;
      }

      ctx.body = genResponse(httpCodes.OK, '用户登录成功', { token: jwt.sign(userInfo, JWT_SECRET, { expiresIn: '1d' }) })
    } catch (err) {
      console.error('用户登录失败', err);
      console.log(err);
      ctx.app.emit('error', userLoginError, ctx);
    }
  }

  async changePassword(ctx) {
    try {
      const id = ctx.state.user.id;
      const password = ctx.request.body.password;
      if (await userService.update({ id, password })) {
        ctx.body = genResponse(httpCodes.OK, '修改密码成功', true)
      } else {
        ctx.body = genResponse(httpCodes.INTERNAL_SERVER_ERROR, '修改密码失败')
      }
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', serverError, ctx);
    }
  }
}

export default new UserController();
