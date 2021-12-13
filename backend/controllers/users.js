//Inclusion de la config
const config = require("../config/config.json");

//Inclusion des modules
const Models = require("../models");
const Bcrypt = require("bcryptjs");
const token = require("jsonwebtoken");

//Récupération du profil
exports.getProfile = (request, response) => {
    Models.User.findOne({
        attributes: ["name", "avatar", "createdAt", "isadmin"],
        where: {
            id: token.verify(request.body.token, config.jwt.secret).userId
        }
    }).then(result => {
        response.status(200).json(result);
    }).catch(error => {
        response.status(401).json(error);
    });
}

//Mise à jour du profil
exports.updateProfile = (request, response) => {
    Models.User.update({
        name: request.body.name,
        avatar: request.body.avatar
    }, {
        where: {
            id: token.verify(request.body.token, config.jwt.secret).userId
        }
    }).then(() => {
        response.status(200).json({
            message: "Informations mises à jour avec succès !"
        });
    }).catch(error => {
        response.status(500).json(error);
    })
}

//Suppression du profil
exports.deleteProfile = (request, response) => {}