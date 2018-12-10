const {assert} = require('chai');
const {seedItemToDatabase, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('User visits update page', function(){
    beforeEach(async function(){
        connectDatabaseAndDropData();
        this.createdItem = await seedItemToDatabase();
    });

    afterEach(disconnectDatabase)

    it('updates information for an item', function(){
        const updatedItem = buildItemObject({
            title: 'Updated title',
            imageUrl: 'https://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg',
            description: 'updated description'});
        browser.url(`/items/${this.createdItem._id}/update`)
        browser.setValue('#title-input', updatedItem.title);
        browser.setValue('#description-input', updatedItem.description);
        browser.setValue('#imageUrl-input', updatedItem.imageUrl);
        browser.click('#submit-button');
        assert.include(browser.getText('body'), updatedItem.title);
        assert.include(browser.getAttribute('body img', 'src'), updatedItem.imageUrl);
    });

    it('displays existing information in input fields', async function(){
        browser.url(`/items/${this.createdItem._id}/update`);
        
        assert.include(browser.getValue('#title-input'), this.createdItem.title);
        assert.include(browser.getValue('#description-input'), this.createdItem.description);
        assert.include(browser.getValue('#imageUrl-input'), this.createdItem.imageUrl);
    });
});