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
