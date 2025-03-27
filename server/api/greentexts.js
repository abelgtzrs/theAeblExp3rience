// api/greentexts.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// GET all greentexts
router.get('/', async (req, res) => {
  const greentexts = await db.Greentext.findAll({ include:{
    model: db.BlessingItem,
    include: db.BlessingComment
  } });
  res.json(greentexts);
});

// POST new greentext
router.post('/', async (req, res) => {
  try {
    const { title, content, volume, date, blessings } = req.body;

    const newText = await db.Greentext.create({ title, content, volume, date });

    if (blessings && blessings.length > 0) {
      const blessingInstances = await Promise.all(
        blessings.map(async (item) => {
          const [blessing] = await db.BlessingItem.findOrCreate({ where: { name: item } });
          return blessing;
        })
      );
      await newText.addBlessingItems(blessingInstances);
    }

    res.json(newText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create greentext' });
  }
});

module.exports = router;
