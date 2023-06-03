const router = require('express').Router();
const { response } = require('express');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({include: [Product]})
    res.json(tags);
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findOne({where: {id: req.params.id}, include: [Product]})
    res.json(tag);
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body)
    res.json(tag);
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {where: {id: req.params.id}})
    res.json(tag);
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    })
    res.json(tag);
  } catch(err) {
    console.log(err)
    response.status(500).json(err)
  }
});

module.exports = router;
