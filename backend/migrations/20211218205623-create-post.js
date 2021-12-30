"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Posts", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         userId: {
            type: Sequelize.INTEGER,
            references: {
               model: "Users",
               key: "id",
            },
            onDelete: "no action",
            onUpdate: "no action",
         },
         title: {
            type: Sequelize.STRING,
         },
         image: {
            type: Sequelize.STRING,
         },
         description: {
            type: Sequelize.STRING(455),
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Posts");
   },
};
