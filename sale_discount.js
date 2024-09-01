/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { ItemController } from './items/controllers/item.controller.js';
import { InputService } from './items/services/input.service.js';
import { ValidationService } from './items/services/validation.service.js';
import { BillingService } from './items/services/billing.service.js';
import { DiscountService } from './items/services/discount.service.js';
import { OutputService } from './items/services/output.service.js';

const main = async () => {
  try {
    const inputService = new InputService();
    const validationService = new ValidationService();
    const billingService = new BillingService();
    const discountService = new DiscountService();
    const outputService = new OutputService();
    const itemController = new ItemController(
      inputService,
      validationService,
      billingService,
      discountService,
      outputService,
    );
    const response = await itemController.checkPriceAndDiscount();
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
};

main();
