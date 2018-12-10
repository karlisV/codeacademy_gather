const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');
const {seedItemToDatabase} = require('../test-utils');

describe('Server path: /items/:itemId/delete', function(){
  beforeEach(async function(){
    connectDatabaseAndDropData();
    this.itemToDelete = await seedItemToDatabase()
  });

  afterEach(disconnectDatabase);

  describe('POST',() => {

    it('item is deleted', async function(){
      const response = await request(app)
        .post(`/items/${this.itemToDelete._id}/delete`)
        .type('form')
        .send();
      const entries = await Item.find();
      assert.equal(entries.length, 0, 'Entries were not deleted')
    });

    it('redirects home', async function(){
      const response = await request(app)
        .post(`/items/${this.itemToDelete._id}/delete`)
        .type('form')
        .send();
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
  });
});