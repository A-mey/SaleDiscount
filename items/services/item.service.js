/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import regexHelper from '../helpers/regex.helper.js';
import isMultipleHelper from '../helpers/isMultiple.helper.js';
import price from '../data/price.js';
import discount from '../data/discount.js';

export class ItemService {
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
      let totalAmount = 0;
      let discountedAmount = 0;
      itemsArray.forEach((element) => {
        const item = element.trim();
        const itemDetails = price.find((x) => x.item.toLowerCase() === item.toLowerCase());
        if (!itemDetails) {
          throw new Error('Invalid item found');
        }
        const discountData = discount.find((x) => x.itemId === itemDetails.id);
        if (elementList.length) {
          const indexInElementList = elementList.findIndex((x) => x.Item.toLowerCase() === item.toLowerCase());
          if (indexInElementList > -1) {
            ({ elementList, totalAmount, discountedAmount } = this.addIntoExistingElement(indexInElementList, elementList, itemDetails, discountData, totalAmount, discountedAmount));
          } else {
            ({ elementList, totalAmount, discountedAmount } = this.addNewelement(elementList, itemDetails, totalAmount, discountedAmount));
          }
        } else {
          ({ elementList, totalAmount, discountedAmount } = this.addNewelement(elementList, itemDetails, totalAmount, discountedAmount));
        }
      });
      totalAmount = totalAmount.toFixed(2);
      discountedAmount = discountedAmount.toFixed(2);
      return { elementList, totalAmount, discountedAmount };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addNewelement = (elementList, itemDetails, totalAmount, discountedAmount) => {
    try {
      elementList.push({
        id: itemDetails.id,
        Item: itemDetails.item,
        Quantity: 1,
        Price: itemDetails.price,
        discountPrice: itemDetails.price,
      });
      totalAmount += itemDetails.price;
      discountedAmount += itemDetails.price;
      return { elementList, totalAmount, discountedAmount };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addIntoExistingElement = (indexInElementList, elementList, itemDetails, discountData, totalAmount, discountedAmount) => {
    try {
      elementList[indexInElementList].Quantity += 1;
      elementList[indexInElementList].Price += itemDetails.price;
      elementList[indexInElementList].discountPrice += itemDetails.price;
      totalAmount += itemDetails.price;
      discountedAmount += itemDetails.price;
      if (discountData && isMultipleHelper(elementList[indexInElementList].Quantity, discountData.amount)) {
        if (elementList[indexInElementList].discountPrice) {
          elementList[indexInElementList].discountPrice = elementList[indexInElementList].discountPrice - (itemDetails.price * discountData.amount) + discountData.discountPrice;
          discountedAmount = discountedAmount - (itemDetails.price * discountData.amount) + discountData.discountPrice;
        } else {
          elementList[indexInElementList].discountPrice = discountData.discountPrice;
          discountedAmount += discountData.discountPrice;
        }
      }
      // }
      return { elementList, totalAmount, discountedAmount };
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
