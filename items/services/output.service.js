/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
export class OutputService {
  modifyData = async (listData, totalPrice, discountedPrice) => {
    try {
      let response = 'Item             Quantity             Price \n ---------------------------------------------------\n';
      listData.forEach((x) => {
        response += `${x.Item}           ${x.Quantity}       ${x.discountPrice} \n`;
      });
      response += `Total price: $${discountedPrice} \nYou saved $${totalPrice - discountedPrice}`;
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
