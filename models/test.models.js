module.exports = function(sequelize, DataTypes) {
    var Test = sequelize.define("Test", {
      access_token: DataTypes.STRING,
      item_id: DataTypes.STRING  
    });
    return Test;
  };
  