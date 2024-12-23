import { isArray, isNil, join, kebabCase } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const createKey = key => {
  return kebabCase(
    join(
      isArray(key)
        ? key
        : [key].filter(char => {
            return !isNil(char);
          }),
      '-'
    )
  ).trim();
};
