/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

const defaultOptions = {allowNull: true, allowEmptyString: true};

export type IPickOptions = typeof defaultOptions;

function pick<T, K extends keyof T>(
  obj: T,
  keys: K[],
  options: IPickOptions = defaultOptions,
): Pick<T, K> {
  return keys.reduce((object, key) => {
    const {allowNull, allowEmptyString} = Object.assign(
      defaultOptions,
      options,
    );

    if (!allowNull && object[key] === null) {
      return obj;
    }

    if (
      !allowEmptyString &&
      typeof object[key] === 'string' &&
      String(object[key]).length === 0
    ) {
      return obj;
    }

    if (object && key in object) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<T, K>);
}

export default pick;
