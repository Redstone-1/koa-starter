import bcrypt from 'bcryptjs';
import userService from '../module/user/user.service';
import {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword
} from "../error/errorTypes";

const { getUserInfo } = userService;

export const userValidator = async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // 合法性
  if (!userName || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }

  await next();
};

export const verifyUser = async (ctx, next) => {
  const { userName } = ctx.request.body;
  try {
    const res = await getUserInfo({ userName });

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
  // 1. 判断用户是否存在(不存在:报错)
  const { userName, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ userName });

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
