module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Greentext', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      volume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      }
    });
  };
  