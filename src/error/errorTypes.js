import httpCodes from "./httpCodes";

// ========== 通用错误 ==========
export const requestError = {
  code: httpCodes.BAD_REQUEST,
  message: '请求错误',
  result: null,
};
export const tokenExpiredError = {
  code: httpCodes.BAD_REQUEST,
  message: 'token已过期',
  result: null,
};
export const invalidToken = {
  code: httpCodes.UNAUTHORIZED,
  message: '无效的token',
  result: null,
};
export const hasNotAdminPermission = {
  code: httpCodes.UNAUTHORIZED,
  message: '没有管理员权限',
  result: null,
};
export const serverError = {
  code: httpCodes.INTERNAL_SERVER_ERROR,
  message: '服务器响应失败',
  result: null,
};

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


