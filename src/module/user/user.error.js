import httpCodes from '../../error/httpCodes';

// ========== 用户模块错误 ==========
export const userFormateError = {
  code: httpCodes.BAD_REQUEST,
  message: '用户名或密码为空',
  result: null,
};

export const userAlreadyExited = {
  code: httpCodes.CONFLICT,
  message: '用户已经存在',
  result: null,
};

export const userRegisterError = {
  code: httpCodes.BAD_REQUEST,
  message: '用户注册错误',
  result: null,
};

export const userDoesNotExist = {
  code: httpCodes.CONFLICT,
  message: '用户不存在',
  result: null,
};

export const userLoginError = {
  code: httpCodes.BAD_REQUEST,
  message: '用户登录失败',
  result: null,
};

export const invalidPassword = {
  code: httpCodes.BAD_REQUEST,
  message: '密码不匹配',
  result: null,
};


