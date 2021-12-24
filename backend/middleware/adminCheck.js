//Import des modeles de bdd
const Models = require("../models");

module.exports = (request, response, next) => {
   Models.User.findOne({
      attributes: ["isadmin"],
      where: {
         id: response.locals.userId,
      },
   }).then((user) => {
      response.locals.isadmin = user.isadmin;
      next();
   });
};
