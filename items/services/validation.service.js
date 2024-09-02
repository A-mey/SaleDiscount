/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import price from '../data/price.js';

export class ValidationService {
//   constructor() {}

  validateItems = async (itemList) => {
    try {
      for (const item of itemList) {
        if (!price.some((x) => x.item.toLowerCase() === item.toLowerCase())) {
          return false;
        }
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
