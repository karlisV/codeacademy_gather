const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId/update', () => {
  beforeEach(async function(){
    connectDatabaseAndDropData();
    this.createdItem = await seedItemToDatabase();
  });

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders update page prefilled with existing item\'s data', async function(){
      const response = await request(app)
        .get(`/items/${this.createdItem._id}/update`);
      assert.equal(response.status, 200)
    });
  });

  describe('POST', () => {
    it('updates the existing entry', async function(){
      const updateItem = buildItemObject({
        title: 'Update title',
        imageUrl: 'https://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg',
        description: 'updated description'});

      const response = await request(app)
        .post(`/items/${this.createdItem._id}/update`)
        .type('form')
        .send(updateItem);

      const updatedItem = await Item.findOne(updateItem);
      assert.isOk(updatedItem, 'Item was not created successfully in the database');    
    })
    it('redirects to single view page', async function(){
      const updateItem = buildItemObject({
          title: 'Updated title',
          imageUrl: 'https://wiesmann.codiferes.net/share/bitmaps/test_pattern.svg',
          description: 'updated description'});
      const response = await request(app)
        .post(`/items/${this.createdItem._id}/update`)
        .type('form')
        .send(updateItem);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/items/${this.createdItem._id}`);
    });
  });

});
