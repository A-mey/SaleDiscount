/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { ReadLine } from '../utils/readLine.util.js';
import regexHelper from '../helpers/regex.helper.js';
import isMultipleHelper from '../helpers/isMultiple.helper.js';
import price from '../data/price.js';
import discount from '../data/discount.js';

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
      return regexHelper(item);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getItemListing = async (items) => {
    try {
      const itemsArray = items.split(',');
      let elementList = [];
      itemsArray.forEach((element) => {
        const item = element.trim();
        const itemDetails = price.find((x) => x.item.toLowerCase() === item.toLowerCase());
        if (!itemDetails) {
          throw new Error('Invalid item found');
        }
        const discountData = discount.find((x) => x.itemId === itemDetails.id);
        if (elementList.length) {
          // eslint-disable-next-line max-len
          const indexInElementList = elementList.findIndex((x) => x.Item.toLowerCase() === item.toLowerCase());
          if (indexInElementList > -1) {
            // eslint-disable-next-line max-len
            elementList = this.addIntoExistingElement(indexInElementList, elementList, itemDetails, discountData);
          } else {
            elementList = this.addNewelement(elementList, itemDetails);
          }
        } else {
          elementList = this.addNewelement(elementList, itemDetails);
        }
      });
      return elementList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addNewelement = (elementList, itemDetails) => {
    try {
      elementList.push({
        id: itemDetails.id,
        Item: itemDetails.item,
        Quantity: 1,
        Price: itemDetails.price,
        discountPrice: itemDetails.price,
      });
      return elementList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addIntoExistingElement = (indexInElementList, elementList, itemDetails, discountData) => {
    try {
      // eslint-disable-next-line max-len
      // const indexInElementList = elementList.findIndex((x) => x.Item.toLowerCase() === item.toLowerCase());
      // if (indexInElementList > -1) {
      elementList[indexInElementList].Quantity += 1;
      elementList[indexInElementList].Price += itemDetails.price;
      elementList[indexInElementList].discountPrice += itemDetails.price;
      // eslint-disable-next-line max-len
      if (discountData && isMultipleHelper(elementList[indexInElementList].Quantity, discountData.amount)) {
        if (elementList[indexInElementList].discountPrice) {
          // elementList[indexInElementList].discountPrice += discountData.discountPrice;
          // eslint-disable-next-line max-len
          elementList[indexInElementList].discountPrice = elementList[indexInElementList].discountPrice - (itemDetails.price * discountData.amount) + discountData.discountPrice;
        } else {
          elementList[indexInElementList].discountPrice = discountData.discountPrice;
        }
      }
      // }
      return elementList;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
