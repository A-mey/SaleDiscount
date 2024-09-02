/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import price from '../data/price.js';

export class BillingService {
  getPricingListing = async (itemList) => {
    try {
      let elementList = [];
      itemList.forEach((item) => {
        const itemDetails = price.find((x) => x.item.toLowerCase() === item.toLowerCase());
        if (!itemDetails) {
          throw new Error('Invalid item found');
        }
        if (elementList.length) {
          const indexInElementList = elementList.findIndex((x) => x.Item.toLowerCase() === item.toLowerCase());
          if (indexInElementList > -1) {
            elementList = this.addIntoExistingElement(indexInElementList, elementList, itemDetails);
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
      });
      return elementList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addIntoExistingElement = (indexInElementList, elementList, itemDetails) => {
    try {
      elementList[indexInElementList].Quantity += 1;
      elementList[indexInElementList].Price += itemDetails.price;
      return elementList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getTotalPricing = async (pricingList) => {
    try {
      const totalPrice = pricingList.reduce((accumulator, currentValue) => accumulator + currentValue.Price, 0);
      return totalPrice.toFixed(2);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
