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
            const unitPrice = price.find((a) => a.id === x.id).price;
            const discountQuantity = x.Quantity / discountData.quantity;
            const disCountPrice = discountQuantity * x.disCountPrice + unitPrice;
            x.discountPrice = disCountPrice;
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

  getTotalDiscount = async (pricingList) => {
    try {
      return pricingList.reduce((accumulator, currentValue) => accumulator + currentValue.discountPrice, 0);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
