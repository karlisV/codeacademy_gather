const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
  	it('renders created item\'s description and title', async () => {
  		// setup
  		const item = await seedItemToDatabase();
  		// excercise
  		const response = await request(app)
  		.get(`/items/${item._id}`);
  		// verification
  		assert.equal(response.status, 200)
		assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
      	assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
  	})
  })
});
