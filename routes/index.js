const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }
});

router.post('/items/:itemId/delete', async (req, res, next) => {
  await Item.deleteOne( { "_id" : req.params.itemId } )
  res.redirect('/');
});

router.get('/items/:itemId/update', async(req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('updateLayout', {item});
});

router.get('/items/:itemId', async(req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.render('singleLayout', {item});
});

router.post('/items/:itemId/update', async(req, res, next) => {
  const itemId = req.params.itemId;
  const {title, description, imageUrl} = req.body;
  const opts = { runValidators: true }
  const item = await Item.updateOne(
    { '_id' : itemId },
    { "title": title,
      "description": description,
      "imageUrl": imageUrl 
    }, opts, function (err) {
      if (err){
        res.redirect(`/items/${itemId}/update`)
      } else {
        res.redirect(`/items/${itemId}`)
      }
  });
  
});

module.exports = router;
