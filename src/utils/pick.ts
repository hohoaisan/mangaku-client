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

    if (!allowNull && obj[key] === null) {
      return object;
    }

    if (
      !allowEmptyString &&
      typeof obj[key] === 'string' &&
      String(obj[key]).trim().length === 0
    ) {
      return object;
    }

    if (object && key in obj) {
      object[key] = obj[key];
    }
    return object;
  }, {} as Pick<T, K>);
}

export default pick;
