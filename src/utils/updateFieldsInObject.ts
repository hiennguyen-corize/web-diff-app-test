import { assign, keys, pick } from 'lodash';

export const updateFieldsInObject = <T>(oldObj: T, newObj: T) => {
  const pickedNewObj = pick(newObj, keys(oldObj));
  return assign({}, oldObj, pickedNewObj);
};
