/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import { describe, it } from 'node:test';
import { ItemService } from '../items/services/item.service.js';

// const { describe } = mocha.describe;
// const { it } = mocha.it;

describe('Services', async () => {
  it('should accept comma separated strings', async () => {
    const itemService = new ItemService();
    expect(await itemService.areItemsValid('Milk, Bread')).to.deep.equal(true);
    expect(await itemService.areItemsValid('123456;')).to.deep.equal(false);
  });

  it('should return bill details', async () => {
    const itemService = new ItemService();
    const response = await itemService.getItemListing('Milk,Milk,Milk,Bread,Bread,Bread,Bread,Apple,Banana');
    expect(response).to.deep.equal([
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
});
