import httpCodes from '../../../error/httpCodes';

// ========== 英雄模块错误 ==========
export const heroDoesNotExist = {
  code: httpCodes.BAD_REQUEST,
  message: '英雄不存在',
  result: null,
};

export const heroAlreadyExited = {
  code: httpCodes.CONFLICT,
  message: '英雄已经存在',
  result: null,
};



