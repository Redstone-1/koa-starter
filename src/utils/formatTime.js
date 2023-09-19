import moment from 'moment';

export const formatTime = (formatTarget = {}, format = 'YYYY-MM-DD HH:mm:ss') => {
  const clonedTarget = { ...formatTarget };
  Object.keys(clonedTarget).forEach((item) => {
    clonedTarget[item] = moment(clonedTarget[item]).format(format);
  });
  return clonedTarget;
};
