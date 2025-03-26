const { Sequelize } = require("sequelize");
const config = require('../config/config.js').development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.passowrd,
    config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Greentext = require('./Greentext')(sequelize, Sequelize);
db.BlessingItem = require('./BlessingItem')(sequelize, Sequelize);

db.Greentext.belongsToMany(db.BlessingItem, { through: 'GreentextBlessings' });
db.BlessingItem.belongsToMany(db.Greentext, { through: 'GreentextBlessings' });

module.exports = db;