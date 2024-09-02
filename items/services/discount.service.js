/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import discount from '../data/discount.js';
import price from '../data/price.js';

export class DiscountService {
  applyDiscount = async (pricingList) => {
    try {
      pricingList.forEach((x) => {
        const discountData = discount.find((a) => a.itemId === x.id);
        if (discountData) {
          if (x.Quantity > discountData.quantity) {
            const disCountPrice = this.calculateDiscount(discountData, x);
            x.discountPrice = disCountPrice;
          } else {
            x.discountPrice = x.Price;
          }
        } else {
          x.discountPrice = x.Price;
        }
      });
      return pricingList;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  calculateDiscount = (discountData, priceData) => {
    try {
      const unitPrice = price.find((a) => a.id === priceData.id).price;
      const discountQuantity = Math.floor(priceData.Quantity / discountData.quantity);
      const undiscountedItems = priceData.Quantity - discountQuantity * discountData.quantity;
      const disCountPrice = (discountQuantity * discountData.discountPrice) + (undiscountedItems * unitPrice);
      return disCountPrice;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getTotalDiscount = async (pricingList) => {
    try {
      const discountPrice = pricingList.reduce((accumulator, currentValue) => accumulator + currentValue.discountPrice, 0);
      return discountPrice.toFixed(2);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
