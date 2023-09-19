export const watchErrors = (err, ctx) => {
  ctx.status = err.code;
  ctx.body = err;
};

export const genResponse = (code = 200, message = '', result = null) => {
  return {
    code,
    message,
    result,
  }
}
