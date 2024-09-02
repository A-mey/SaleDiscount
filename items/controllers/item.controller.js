/* eslint-disable import/prefer-default-export */
export class ItemController {
  inputService;

  validationService;

  billingService;

  discountService;

  constructor(inputService, validationService, billingService, discountService, outputService) {
    this.inputService = inputService;
    this.validationService = validationService;
    this.billingService = billingService;
    this.discountService = discountService;
    this.outputService = outputService;
  }

  checkPriceAndDiscount = async () => {
    try {
      const itemList = await this.inputService.getItemsList();
      const areItemsValid = await this.validationService.validateItems(itemList);
      if (!areItemsValid) {
        throw new Error('Invalid input');
      }
      let listData = await this.billingService.getPricingListing(itemList);
      const totalPrice = await this.billingService.getTotalPricing(listData);
      listData = await this.discountService.applyDiscount(listData);
      const totalDiscount = await this.discountService.getTotalDiscount(listData);
      const response = await this.outputService.modifyData(listData, totalPrice, totalDiscount);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
