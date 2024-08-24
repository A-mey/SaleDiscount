/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { ItemController } from './items/controllers/item.controller.js';
import { ItemService } from './items/services/item.service.js';

const main = async () => {
  const itemService = new ItemService();
  const itemController = new ItemController(itemService);
  const response = await itemController.checkPriceAndDiscount();
  console.log(response);
};

main();
