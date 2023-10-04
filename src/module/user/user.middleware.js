import bcrypt from 'bcryptjs';
import userService from './user.service';
import {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword
} from './user.error';
import { serverError } from '../../error/handleError'

export const userValidator = async (ctx, next) => {
  try {
    const { userName, password } = ctx.request.body;
    // 合法性
    if (!userName || !password) {
      console.error('用户名或密码为空', ctx.request.body);
      ctx.app.emit('error', userFormateError, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    ctx.app.emit('error', serverError, ctx);
    return;
  }

  await next();
};

export const verifyUser = async (ctx, next) => {
  try {
    const { userName } = ctx.request.body;
    const res = await userService.get({ userName });

    if (res) {
      console.error('用户名已经存在', { userName });
      ctx.app.emit('error', userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    console.error('获取用户信息错误', err);
    ctx.app.emit('error', userRegisterError, ctx);
    return;
  }

  await next();
};

export const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;
  await next();
};

export const verifyLogin = async (ctx, next) => {
  try {
    const { userName, password } = ctx.request.body;
    const res = await userService.get({ userName });

    if (!res) {
      console.error('用户名不存在', { userName });
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }

    // 2. 密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit('error', userLoginError, ctx);
  }

  await next();
};
