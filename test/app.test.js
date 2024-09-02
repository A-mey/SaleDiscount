/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import { describe, it, before } from 'node:test';
import { InputService } from '../items/services/input.service.js';
import { ValidationService } from '../items/services/validation.service.js';
import { BillingService } from '../items/services/billing.service.js';
import { DiscountService } from '../items/services/discount.service.js';

describe('Input services', async () => {
  let inputService;

  before(() => {
    inputService = new InputService();
  });

  it('should modify items', async () => {
    const items = await inputService.modifyItems('milk,    bread,banana');
    expect(items).to.deep.equal(['milk', 'bread', 'banana']);
  });
});

describe('Validation services', async () => {
  let validationService;

  before(() => {
    validationService = new ValidationService();
  });

  it('should validate items', async () => {
    const itemsTrue = await validationService.validateItems(['milk', 'bread', 'banana']);
    const itemsFalse = await validationService.validateItems(['milk', 'bread', 'pineapple']);
    expect(itemsTrue).to.deep.equal(true);
    expect(itemsFalse).to.deep.equal(false);
  });
});

describe('Billing services', async () => {
  let billingService;

  before(() => {
    billingService = new BillingService();
  });

  it('should return item details', async () => {
    const response = await billingService.getPricingListing(['Milk', 'Milk', 'Milk', 'Bread', 'Bread', 'Bread', 'Bread', 'Apple', 'Banana']);
    expect(response).to.deep.equal([
      {
        id: 1, Item: 'Milk', Quantity: 3, Price: 11.91,
      },
      {
        id: 2, Item: 'Bread', Quantity: 4, Price: 8.68,
      },
      {
        id: 4, Item: 'Apple', Quantity: 1, Price: 0.89,
      },
      {
        id: 3, Item: 'Banana', Quantity: 1, Price: 0.99,
      },
    ]);
  });

  it('should return total bill', async () => {
    const totalBill = await billingService.getTotalPricing([
      {
        id: 1, Item: 'Milk', Quantity: 3, Price: 11.91,
      },
      {
        id: 2, Item: 'Bread', Quantity: 4, Price: 8.68,
      },
      {
        id: 4, Item: 'Apple', Quantity: 1, Price: 0.89,
      },
      {
        id: 3, Item: 'Banana', Quantity: 1, Price: 0.99,
      },
    ]);
    expect(totalBill).to.deep.equal('22.47');
  });
});

describe('Discount service', async () => {
  let discountService;

  before(() => {
    discountService = new DiscountService();
  });

  it('should return discounted amount', async () => {
    const d = discountService.calculateDiscount({ itemId: 1, quantity: 2, discountPrice: 5 }, {
      id: 1, Item: 'Milk', Quantity: 3, Price: 11.91,
    });
    expect(d).to.deep.equal(8.97);
  });

  it('should return discounted items list', async () => {
    const discountedItems = await discountService.applyDiscount([
      {
        id: 1, Item: 'Milk', Quantity: 3, Price: 11.91,
      },
      {
        id: 2, Item: 'Bread', Quantity: 4, Price: 8.68,
      },
      {
        id: 4, Item: 'Apple', Quantity: 1, Price: 0.89,
      },
      {
        id: 3, Item: 'Banana', Quantity: 1, Price: 0.99,
      },
    ]);
    expect(discountedItems).to.deep.equal([
      {
        id: 1, Item: 'Milk', Quantity: 3, Price: 11.91, discountPrice: 8.97,
      },
      {
        id: 2, Item: 'Bread', Quantity: 4, Price: 8.68, discountPrice: 8.17,
      },
      {
        id: 4, Item: 'Apple', Quantity: 1, Price: 0.89, discountPrice: 0.89,
      },
      {
        id: 3, Item: 'Banana', Quantity: 1, Price: 0.99, discountPrice: 0.99,
      },
    ]);
  });

  it('should return total discount', async () => {
    const totalDiscount = await discountService.getTotalDiscount([
      {
        id: 1, Item: 'Milk', Quantity: 3, Price: 11.91, discountPrice: 8.97,
      },
      {
        id: 2, Item: 'Bread', Quantity: 4, Price: 8.68, discountPrice: 8.17,
      },
      {
        id: 4, Item: 'Apple', Quantity: 1, Price: 0.89, discountPrice: 0.89,
      },
      {
        id: 3, Item: 'Banana', Quantity: 1, Price: 0.99, discountPrice: 0.99,
      },
    ]);
    expect(totalDiscount).to.deep.equal('19.02');
  });
});
