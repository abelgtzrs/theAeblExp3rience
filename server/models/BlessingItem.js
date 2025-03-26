module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BlessingItem', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  };