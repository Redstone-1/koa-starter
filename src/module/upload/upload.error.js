import httpCodes from "../../error/httpCodes";

export const overLimitSize = {
  code: httpCodes.BAD_REQUEST,
  message: '文件大小超过限制',
  result: null
}
