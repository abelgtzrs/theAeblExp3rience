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
    const { title, content, volume, blessings } = req.body;

    // 1. Create Greentext
    const newText = await db.Greentext.create({ title, content, volume });

    // 2. Process blessings with comments
    if (blessings && blessings.length > 0) {
      for (const bless of blessings) {
        const [blessingItem] = await db.BlessingItem.findOrCreate({
          where: { name: bless.name },
        });

        // Associate BlessingItem with Greentext
        await newText.addBlessingItem(blessingItem);

        // Add comments if they exist
        if (bless.comment) {
          await db.BlessingComment.create({
            comment: bless.comment,
            BlessingItemId: blessingItem.id,
          });
        }
      }
    }

    res.json(newText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create greentext' });
  }
});

module.exports = router;
