const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/greentexts', async (req, res) => {
  const greentexts = await db.Greentext.findAll({
    include: db.BlessingItem
  });
  res.json(greentexts);
});


app.post('/api/greentexts', async (req, res) => {
  try {
    const { title, content, volume, date, blessings } = req.body;

    // 1. Create Greentext
    const newText = await db.Greentext.create({ title, content, volume, date });

    // 2. Find or Create BlessingItems
    if (blessings && blessings.length > 0) {
      const blessingPromises = blessings.map(async (item) => {
        const [blessing] = await db.BlessingItem.findOrCreate({ where: { name: item } });
        return blessing;
      });

      const blessingResults = await Promise.all(blessingPromises);

      // 3. Associate with Greentext
      await newText.addBlessingItems(blessingResults);
    }

    res.json(newText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create greentext' });
  }
});

const db = require('./models');

db.sequelize.sync({ force: false })
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Failed to sync DB:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
