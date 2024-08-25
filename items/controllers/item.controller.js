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
      let response = 'Invalid items entered';
      if (areItemsValid) {
        response = await this.itemsService.getItemListing(items);
      }
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
