// api/blessings.js
const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  const blessings = await db.BlessingItem.findAll();
  res.json(blessings);
});

module.exports = router;
