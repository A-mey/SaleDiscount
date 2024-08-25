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
      if (!areItemsValid) {
        throw new Error('Invalid input');
      }
      const listData = await this.itemsService.getItemListing(items);
      const response = await this.itemsService.modifyData(listData);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
