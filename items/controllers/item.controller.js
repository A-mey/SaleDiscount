/* eslint-disable import/prefer-default-export */
export class ItemController {
  itemsService;

  constructor(itemsService) {
    this.itemsService = itemsService;
  }

  checkPriceAndDiscount = async () => {
    try {
      const items = await this.itemsService.getInput();
      const areItemsValid = await this.itemsService.areItemsValid(items);
      // const response = 'Invalid items entered';
      // if (areItemsValid) {

      // }
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
