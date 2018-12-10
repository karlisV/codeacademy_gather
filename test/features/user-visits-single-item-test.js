const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
describe('User visits single item page', function(){
    describe('when new item is created', function(){
        // setup
        beforeEach(function(){
            this.itemToCreate = buildItemObject();
            browser.url('/items/create');
            browser.setValue('#title-input', this.itemToCreate.title);
            browser.setValue('#description-input', this.itemToCreate.description);
            browser.setValue('#imageUrl-input', this.itemToCreate.imageUrl);
            browser.click('#submit-button');
        });

        it('and description of the item is displayed', function(){
            //excercise
            browser.click('.item-card a')
            //verification
            assert.include(browser.getText('body'), this.itemToCreate.description);
        });
    });
});