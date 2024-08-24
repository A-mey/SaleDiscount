/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { ReadLine } from '../utils/readLine.util.js';
import itemValidator from '../validators/items.validator.js';

export class ItemService {
  getInput = async () => {
    try {
      const readLine = new ReadLine();
      const items = await readLine.askQuestion('Please enter all the items purchased separated by a comma ');
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  areItemsValid = async (item) => {
    try {
      return itemValidator(item);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
