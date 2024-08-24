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
});
