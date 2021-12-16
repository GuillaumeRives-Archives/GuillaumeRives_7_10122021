//Inclusion des variables d'environnement
const config = require("../config/config.json");

//Inclusion des modules
const Models = require("../models");
const Bcrypt = require("bcryptjs");
const Crypto = require("../utils/crypto");
const Token = require("jsonwebtoken");

//Fonction appelée par la route signup
exports.signup = (request, response) => {
    let newUser = {};
    Models.User.findOne({
        attributes: ["email", "name"],
        where: {
            "email": Crypto.sha256(request.body.email)
        }
    }).then(result => {
        if (result) {
            response.status(400).json({
                "message": "Ce compte existe déjà !"
            });
        } else {
            Bcrypt.hash(request.body.password, config.bcrypt.saltrounds).then(hash => {
                newUser = {
                    name: request.body.name,
                    email: Crypto.sha256(request.body.email),
                    password: hash,
                    avatar: `${request.protocol}://${request.get("host")}/images/avatars/defaultAvatar.png`,
                    isadmin: 0
                }
                Models.User.create(newUser).then(result => {
                    response.status(200).json({
                        "message": "Utilisateur créé !"
                    })
                }).catch(error => {
                    response.status(500).json({
                        "message": error
                    })
                })
            }).catch(error => {
                response.status(500).json({
                    "message": error
                });
            });
        }
    })
};

//Fonction appelée par la route login
exports.login = (request, response) => {
    Models.User.findOne({
        attributes: ["email", "id", "password"],
        where: {
            "email": Crypto.sha256(request.body.email)
        }
    }).then(result => {
        if (!result) {
            return response.status(401).json({
                message: "Cet identifiant est introuvable !"
            });
        }
        Bcrypt.compare(request.body.password, result.password).then(valid => {
            if (!valid) {
                return response.status(401).json({
                    message: "Mot de passe incorrect !"
                });
            }
            response.status(200).json({
                userId: result.id,
                token: Token.sign({
                        userId: result.id
                    },
                    config.jwt.secret, {
                        expiresIn: config.jwt.expiration
                    }
                )
            });
        }).catch(error => {
            response.status(500).json(error);
            console.error(error);
        })
    }).catch(error => {
        response.status(500).json(error);
        console.error(error);
    });
};