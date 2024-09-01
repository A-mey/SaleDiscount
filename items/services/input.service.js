/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { ReadLine } from '../utils/readLine.util';

export class InputService {
  readLine;

  constructor() {
    this.readLine = new ReadLine();
  }

  getItemsList = async () => {
    try {
      const items = await this.getInput();
      const itemsList = await this.modifyItems(items);
      return itemsList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  modifyItems = async (items) => {
    try {
      return items.split(',').map((x) => x.trim());
    } catch (error) {
      throw new Error(error.messge);
    }
  };

  getInput = async () => {
    try {
      const items = await this.readLine.askQuestion('Please enter all the items purchased separated by a comma ');
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
