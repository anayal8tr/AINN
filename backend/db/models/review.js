'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Review.hasOne(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete:"cascade"
      });
      // Each Review belongs to a Spot
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
        onDelete: "cascade" });

      // Each Review belongs to a User
      Review.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade" });
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Spots', key: 'id' }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200] 
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    createdAt:{
      type: DataTypes.DATE
    },
    updatedAt:{
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Review'
  });

  return Review;
};