module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BlessingComment', {
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  };
  