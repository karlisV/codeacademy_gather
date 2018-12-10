const {assert} = require('chai');
const {seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });
  describe('can navigate', () => {
    beforeEach(async function(){
      connectDatabaseAndDropData();
      this.createdItem = await seedItemToDatabase();
    });

    afterEach(disconnectDatabase);

    it('to the create page', () => {
      // Setup
      browser.url('/');
      // Exercise
      browser.click('a[href="/items/create"]');
      // Verification
      assert.include(browser.getText('body'), 'Create');
    });
    it('to the update page', function(){
      // setup
      browser.url(`/`);
      browser.click('.item-card a')
      // Exercise
      browser.click(`div.update-button`);
      // Verification
      console.log(browser.getText('h2'));

      assert.include(browser.getText('h2'), this.createdItem.title);
    });
  })
});
