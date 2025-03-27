const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount API Routes
app.use('/api/greentexts', require('./api/greentexts'));
app.use('/api/blessings', require('./api/blessings'));

// Sync DB + Start Server
db.sequelize.sync({ force: false }).then(() => {
  console.log("✅ Database synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});